import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/573225525998?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20Ludoia.";

export function FloatingWhatsapp() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center group">
      <span className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-gray-900">
        Si quieres hablar con una persona escribe aquí
        <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rotate-45 bg-gray-800 dark:bg-white"></div>
      </span>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp sobre Ludoia"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/40 transition hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}


