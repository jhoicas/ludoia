import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/573183838417?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20el%20ERP%20Ludoia.";

export function FloatingWhatsapp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp sobre el ERP Ludoia"
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 transition hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}


