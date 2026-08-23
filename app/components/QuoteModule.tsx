"use client";

import { useState } from "react";

export function QuoteModule() {
  const [hours, setHours] = useState<number>(100);
  const [model, setModel] = useState<"saas" | "source">("saas");
  const [currency, setCurrency] = useState<"USD" | "COP">("USD");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const hourlyRateUSD = 45;
  const usdToCop = 4000;

  const baseCostUSD = hours * hourlyRateUSD;
  const markup = model === "source" ? 2.5 : 1.0;
  const totalUSD = baseCostUSD * markup;
  const totalCOP = totalUSD * usdToCop;

  const displayTotal = currency === "USD" 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalUSD)
    : new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(totalCOP);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, hours, model, currency }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="cotizador" className="py-24 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Cotizador Interactivo
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Estima el costo de tu desarrollo a la medida.
        </p>
        
        <div className="mt-10 mx-auto max-w-2xl rounded-3xl bg-slate-50 dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-left">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Horas Estimadas de Desarrollo: {hours}h
              </label>
              <input
                type="range"
                min="40"
                max="1000"
                step="10"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Modelo de Negocio</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value as "saas" | "source")}
                  className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-slate-900 dark:text-white"
                >
                  <option value="saas">Licenciamiento (SaaS)</option>
                  <option value="source">Propiedad Total (Source Code)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Moneda</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as "USD" | "COP")}
                  className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-slate-900 dark:text-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="COP">COP ($)</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl text-center border border-blue-100 dark:border-blue-900/50">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Inversión Estimada</p>
              <p className="text-4xl font-bold text-slate-900 dark:text-white">{displayTotal}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 px-3 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {status === "loading" ? "Enviando..." : "Solicitar Cotización Formal"}
            </button>

            {status === "success" && (
              <p className="text-green-600 dark:text-green-400 text-sm text-center">¡Solicitud enviada con éxito!</p>
            )}
            {status === "error" && (
              <p className="text-red-600 dark:text-red-400 text-sm text-center">Hubo un error al enviar la solicitud.</p>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
