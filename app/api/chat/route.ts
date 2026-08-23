import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { ChatRequestSchema } from './schema';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy',
});

const SYSTEM_PROMPT = `
Eres un asistente virtual de Ludoia, una empresa de ERP en la nube.
Responde de manera amigable.
Si el usuario indica que desea "hablar con un asesor", "hablar con un humano", "soporte humano" o similar,
DEBES responder EXACTAMENTE con el siguiente JSON y nada más:
{ "action": "redirect", "url": "https://wa.me/573225525998" }
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ChatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { message } = parsed.data;

    const msg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message }],
    });

    const reply = msg.content[0].type === 'text' ? msg.content[0].text : '';

    try {
      const jsonMatch = reply.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonReply = JSON.parse(jsonMatch[0]);
        if (jsonReply.action === 'redirect') {
          return NextResponse.json(jsonReply);
        }
      }
    } catch (e) {
      // Ignorar, no era JSON válido
    }

    return NextResponse.json({ text: reply });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
