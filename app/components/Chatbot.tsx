"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hola, soy el asistente de Ludoia. ¿En qué te puedo ayudar hoy?" },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = message;
    setChatLog((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (data.action === "redirect" && data.url) {
        window.open(data.url, "_blank");
        setChatLog((prev) => [
          ...prev,
          { role: "assistant", content: "Te estoy redirigiendo con un asesor en WhatsApp..." },
        ]);
      } else if (data.text) {
        setChatLog((prev) => [...prev, { role: "assistant", content: data.text }]);
      } else {
        setChatLog((prev) => [...prev, { role: "assistant", content: "Ocurrió un error al procesar tu solicitud." }]);
      }
    } catch (error) {
      setChatLog((prev) => [...prev, { role: "assistant", content: "Error de conexión." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700"
        >
          <MessageSquare className="h-7 w-7" />
        </button>
      )}

      {isOpen && (
        <div className="flex h-96 w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
            <h3 className="font-semibold">Asistente Ludoia</h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-blue-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatLog.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 text-sm text-slate-500 animate-pulse">
                  Escribiendo...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-slate-200 dark:border-slate-800 p-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </form>
        </div>
      )}
    </div>
  );
}
