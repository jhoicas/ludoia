import { NextResponse } from 'next/server';
import { QuoteRequestSchema } from './schema';
import { rateLimit } from '../chat/rate-limit'; // Reutilizamos el rate limit

export async function POST(req: Request) {
  try {
    const rateLimitResult = await rateLimit(req, 10);
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = QuoteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Por ahora solo simulamos que guardamos en BD o enviamos correo
    console.log("Cotización solicitada:", parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Quote API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
