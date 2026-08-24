import { NextResponse } from 'next/server';
import { QuoteRequestSchema } from './schema';
import { rateLimit } from '../chat/rate-limit';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy',
});

const getSystemPrompt = (language: string) => `
Eres un Arquitecto de Software Experto evaluando requerimientos técnicos.
El usuario te dará la descripción de una idea de software a la medida.
Debes estimar el costo y el tiempo de desarrollo.

El usuario tiene la interfaz en idioma: ${language.toUpperCase()}.
Tu respuesta DEBE ser ÚNICAMENTE un JSON válido con esta estructura exacta (calculando los valores numéricos basándote en la complejidad):
{
  "reasoning": "Se detectó un sitio informativo simple tipo blog, por lo que se requiere únicamente un maquetado estático con gestor de contenidos básico.",
  "estimatedPriceUSD": 2500,
  "estimatedPriceCOP": 10000000,
  "estimatedTimeWeeks": 2,
  "projectedDate": "2026-11-01"
}

Reglas de Escala de Precios (Estricto - 4 Niveles):
- Sitio Básico / Blog / Landing Page: $1,500 - $3,500 USD (1 - 3 Semanas). Keywords: blog, landing, página informativa, mostrar información, sitio sencillo, sitio web. IMPORTANTE: Si incluye "blog" o "mostrar información", el precio NUNCA supere los $3,000 USD.
- MVP / Sistema Web Básico: $4,500 - $10,000 USD (3 - 6 Semanas). Keywords: autenticación, login, crud, roles, catálogo, formulario de registro.
- Plataforma / Complejidad Media: $11,000 - $25,000 USD (6 - 12 Semanas). Keywords: e-commerce, tienda, pasarela de pagos, crm, dashboard, panel de administración.
- Enterprise / Alta Escala: $28,000 - $70,000+ USD (12 - 24+ Semanas). Keywords: concurrencia, 1 millón, visitas, alta disponibilidad, microservicios, IA integrada.

Explica tu evaluación técnica detallada en el campo "reasoning".
IMPORTANTE DETECCIÓN DE IDIOMA: Asegúrate que "reasoning" DEBE estar redactado estrictamente en el idioma solicitado (${language.toUpperCase()}).
No incluyas texto markdown, solo JSON.
`;


export async function POST(req: Request) {
  try {
    const rateLimitResult = await rateLimit(req, 5); // Stricter limit for AI calls
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = QuoteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const getFallbackEstimate = (description: string) => {
      const descLower = description.toLowerCase();
      
      const enterpriseKeywords = ["concurrencia", "1 millón", "1 millon", "millón", "visitas", "alta disponibilidad", "microservicios", "ia integrada"];
      const mediumKeywords = ["e-commerce", "ecommerce", "tienda", "pasarela", "pagos", "crm", "dashboard", "panel"];
      const mvpKeywords = ["autenticación", "autenticacion", "login", "crud", "roles", "catálogo", "catalogo", "registro"];
      const basicKeywords = ["blog", "landing", "informativa", "mostrar información", "sencillo", "sitio web"];
      
      let isEnterprise = enterpriseKeywords.some(kw => descLower.includes(kw));
      let isMedium = mediumKeywords.some(kw => descLower.includes(kw));
      let isMvp = mvpKeywords.some(kw => descLower.includes(kw));
      let isBasic = basicKeywords.some(kw => descLower.includes(kw));
      
      let priceUSD, priceCOP, weeks, reasoning;
      const isEnglish = descLower.includes(" the ") || descLower.includes(" and ") || descLower.includes(" I need ");

      if (isEnterprise) {
        priceUSD = 40000;
        priceCOP = 160000000;
        weeks = 18;
        reasoning = isEnglish ? "A very high scale and critical technical requirement was identified, needing massive data handling and high availability." : "Se identificó un requerimiento de altísima escala y criticidad técnica con necesidad de manejo masivo y alta disponibilidad.";
      } else if (isMedium) {
        priceUSD = 18000;
        priceCOP = 72000000;
        weeks = 10;
        reasoning = isEnglish ? "A medium complexity platform requiring core business integrations (e-commerce, CRM, etc.) was identified." : "Se identificó una plataforma de complejidad media que requiere integraciones de negocio core, como comercio electrónico o gestión de usuarios avanzada.";
      } else if (isMvp || description.length > 200) {
        priceUSD = 7500;
        priceCOP = 30000000;
        weeks = 5;
        reasoning = isEnglish ? "An MVP system was detected to validate essential business functions with real users (registration, relational database)." : "Se detectó un sistema MVP para validar funciones esenciales de negocio con usuarios reales (registro, base de datos relacional).";
      } else {
        priceUSD = 2500;
        priceCOP = 10000000;
        weeks = 2;
        reasoning = isEnglish ? "A purely informative or basic web presence requirement without complex transactional logic was detected." : "Se detectó un requerimiento de carácter informativo o de presencia web rápida sin lógica transaccional compleja.";
      }

      if ((descLower.includes("blog") || descLower.includes("mostrar información") || descLower.includes("mostrar informacion")) && priceUSD > 3000) {
        priceUSD = 2900;
        priceCOP = 11600000;
        weeks = 2;
        reasoning = isEnglish ? "The requirement seems informative with static content or blog keywords detected, adjusting times and costs to a basic scale." : "El requerimiento parece informativo y se detectaron palabras clave de contenido estático o blog, lo que ajusta los tiempos y costos a una escala sencilla.";
      }

      return {
        reasoning,
        estimatedPriceUSD: priceUSD,
        estimatedPriceCOP: priceCOP,
        estimatedTimeWeeks: weeks,
        projectedDate: new Date(Date.now() + weeks * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
    };

    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn('ANTHROPIC_API_KEY is not defined. Falling back to algorithmic estimate.');
      return NextResponse.json({ success: true, estimate: getFallbackEstimate(parsed.data.projectDescription) });
    }

    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 500,
        temperature: 0.1,
        system: getSystemPrompt(parsed.data.language),
        messages: [{ role: 'user', content: parsed.data.projectDescription }]
      });

      const aiText = response.content[0].type === 'text' ? response.content[0].text : '{}';
      const jsonResponse = JSON.parse(aiText);
      return NextResponse.json({ success: true, estimate: jsonResponse });
    } catch (e) {
      console.error("AI API call failed or parsing error:", e);
      return NextResponse.json({ success: true, estimate: getFallbackEstimate(parsed.data.projectDescription) });
    }

  } catch (error) {
    console.error('Quote API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
