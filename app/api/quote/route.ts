import { NextResponse } from 'next/server';
import { QuoteRequestSchema } from './schema';
import { rateLimit } from '../chat/rate-limit';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy',
});

const SYSTEM_PROMPT = `
Eres un Arquitecto de Software Experto evaluando requerimientos técnicos.
El usuario te dará la descripción de una idea de software a la medida.
Debes estimar el costo y el tiempo de desarrollo.

Tu respuesta DEBE ser ÚNICAMENTE un JSON válido con esta estructura exacta (calculando los valores numéricos basándote en la complejidad):
{
  "estimatedPriceUSD": 12000,
  "estimatedPriceCOP": 48000000,
  "estimatedTimeWeeks": 8,
  "projectedDate": "2026-11-01",
  "businessModels": {
    "saas": "Licenciamiento mensual/anual con infraestructura gestionada.",
    "fullOwnership": "Transferencia del 100% del código fuente y propiedad intelectual."
  },
  "disclaimer": "Esta estimación es un borrador preliminar. Se requiere una sesión de descubrimiento para un alcance definitivo."
}

Reglas de Escala de Precios (Estricto):
- Proyecto Básico / MVP (apps simples, landing, webs corporativas): $8,000 USD - $15,000 USD (32,000,000 - 60,000,000 COP) | 4 - 8 Semanas.
- Proyecto Complejidad Media (integraciones, CRM, e-commerce, paneles a medida): $15,000 USD - $35,000 USD (60,000,000 - 140,000,000 COP) | 8 - 14 Semanas.
- Proyecto Enterprise / Carga Masiva (millón de visitas, IA, microservicios, móvil, alta disponibilidad, pagos concurrentes): $35,000 USD - $85,000+ USD (140,000,000 - 340,000,000+ COP) | 16 - 28+ Semanas.

Multiplica de forma escalonada el costo y tiempo si detectas palabras clave de alta escala (concurrencia, millón, IA, microservicios, pagos).
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
      
      const enterpriseKeywords = ["concurrencia", "millón", "millon", "visitas", "usuarios", "escala", "sistemas de pago", "pagos", "alta disponibilidad", "móvil", "movil", "ia", "inteligencia artificial", "microservicios"];
      const mediumKeywords = ["integración", "integracion", "crm", "e-commerce", "ecommerce", "panel", "dashboard", "roles", "personalizado"];
      
      let isEnterprise = enterpriseKeywords.some(kw => descLower.includes(kw));
      let isMedium = mediumKeywords.some(kw => descLower.includes(kw)) || description.length > 200;
      
      let priceUSD, priceCOP, weeks;

      if (isEnterprise) {
        priceUSD = 45000;
        priceCOP = 180000000;
        weeks = 20;
      } else if (isMedium) {
        priceUSD = 22000;
        priceCOP = 88000000;
        weeks = 10;
      } else {
        priceUSD = 10000;
        priceCOP = 40000000;
        weeks = 6;
      }

      return {
        estimatedPriceUSD: priceUSD,
        estimatedPriceCOP: priceCOP,
        estimatedTimeWeeks: weeks,
        projectedDate: new Date(Date.now() + weeks * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        businessModels: {
          saas: "Licenciamiento mensual/anual con infraestructura gestionada.",
          fullOwnership: "Transferencia del 100% del código fuente y propiedad intelectual."
        },
        disclaimer: "Esta estimación es un borrador preliminar generado algorítmicamente. Se requiere una sesión de descubrimiento para un alcance definitivo."
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
        system: SYSTEM_PROMPT,
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
