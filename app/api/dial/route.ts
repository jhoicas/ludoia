import { NextRequest, NextResponse } from "next/server";

const DIAL_ENDPOINT =
  "https://aivoiceagent-zddyo.ondigitalocean.app/dial";

export async function POST(_req: NextRequest) {
  const toNumber =
    process.env.NEXT_PUBLIC_DIAL_NUMBER ?? "+573183838417";

  try {
    const res = await fetch(DIAL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to_number: toNumber,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, message: "No se pudo iniciar la llamada" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error llamando al endpoint de marcado", error);
    return NextResponse.json(
      { ok: false, message: "Error inesperado al iniciar la llamada" },
      { status: 500 },
    );
  }
}

