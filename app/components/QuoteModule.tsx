"use client";

import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { Calculator, Clock, Code, Shield, MessageCircle } from "lucide-react";

type EstimateResult = {
  reasoning?: string;
  architecture?: string;
  estimatedPriceUSD: number;
  estimatedPriceCOP: number;
  estimatedTimeWeeks: number;
  projectedDate: string;
  businessModels: {
    saas: string;
    fullOwnership: string;
  };
  disclaimer: string;
};

export function QuoteModule() {
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [hours, setHours] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setEstimate(null);
    setErrorMessage("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDescription: description }),
      });
      
      if (res.status === 429) {
        setErrorMessage(t("quote.rateLimitExceeded"));
        setStatus("error");
        return;
      }

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setEstimate(data.estimate);
      setHours(Math.round(data.estimate.estimatedPriceUSD / 40));
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="cotizador" className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {t("quote.title")}
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          {t("quote.subtitle")}
        </p>
        
        <div className="mt-10 mx-auto bg-white dark:bg-slate-950 rounded-3xl p-6 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl text-left flex flex-col lg:flex-row gap-10">
          
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Project Description</label>
                <textarea
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("quote.placeholder")}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 py-3 px-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || description.length < 10}
                className="w-full rounded-full bg-blue-600 px-6 py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:hover:shadow-none"
              >
                {status === "loading" ? "Analyzing..." : t("quote.button")}
              </button>
            </form>
            
            {status === "error" && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-4 text-center font-medium">
                {errorMessage || "Error connecting to AI. Please try again."}
              </p>
            )}
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                {t("quote.disclaimer")}
              </p>
            </div>
          </div>

          {/* Results Panel */}
          {estimate && (
            <div className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-right-8 duration-500">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" /> AI Estimate Results
              </h3>
              
              <div className="space-y-6">
                
                {estimate.reasoning && (
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                    <p className="text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed italic">
                      "{estimate.reasoning}"
                    </p>
                    {estimate.architecture && (
                      <div className="mt-3 flex items-center gap-2">
                        <Code className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">Suggested Stack: {estimate.architecture}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Estimated Hours</p>
                    <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                      <button 
                        onClick={() => setHours(h => Math.max(10, h - 10))}
                        className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded shadow-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 font-bold"
                      >-</button>
                      <span className="w-12 text-center font-bold text-slate-900 dark:text-white">{hours}</span>
                      <button 
                        onClick={() => setHours(h => h + 10)}
                        className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 rounded shadow-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 font-bold"
                      >+</button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Estimated Investment (at $40/hr)</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${(hours * 40).toLocaleString()} USD</p>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">${(hours * 40 * 4000).toLocaleString()} COP</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                      <Clock className="w-4 h-4" /> <span className="text-xs font-semibold uppercase">Timeline</span>
                    </div>
                    <p className="font-bold text-slate-900 dark:text-white">{Math.ceil(hours / 40)} Weeks</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                      <Calculator className="w-4 h-4" /> <span className="text-xs font-semibold uppercase">Launch Date</span>
                    </div>
                    <p className="font-bold text-slate-900 dark:text-white">{new Date(Date.now() + Math.ceil(hours / 40) * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">SaaS Model</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{estimate.businessModels.saas}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Full Ownership</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{estimate.businessModels.fullOwnership}</p>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-200 dark:border-slate-800">
                  <a 
                    href={`https://wa.me/573225525998?text=${encodeURIComponent(t("quote.whatsapp.msg"))}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1EBE5A] text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t("quote.whatsapp.cta")}
                  </a>
                </div>

                <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    {t("quote.disclaimer.note")}
                  </p>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t("quote.disclaimer.fee")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
