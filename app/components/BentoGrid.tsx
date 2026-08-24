"use client";

import { useTranslation } from "../hooks/useTranslation";
import { ExternalLink, Calendar, Building2, PackageSearch } from "lucide-react";

export function BentoGrid() {
  const { t } = useTranslation();

  const cases = [
    {
      title: t("cases.agendador.title"),
      url: "https://agendador.ludoia.com/",
      desc: t("cases.agendador.desc"),
      colSpan: "col-span-1 lg:col-span-2",
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      icon: <Calendar className="h-6 w-6 text-blue-600" />
    },
    {
      title: t("cases.systemtravels.title"),
      url: "https://systemtravels.app/",
      desc: t("cases.systemtravels.desc"),
      colSpan: "col-span-1 lg:col-span-1",
      bg: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
      icon: <Building2 className="h-6 w-6 text-emerald-600" />
    },
    {
      title: t("cases.stockia.title"),
      url: "https://stock.ludoia.com/",
      desc: t("cases.stockia.desc"),
      colSpan: "col-span-1 lg:col-span-3",
      bg: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      icon: <PackageSearch className="h-6 w-6 text-purple-600" />
    }
  ];

  return (
    <section id="casos" className="py-24 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t("cases.title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            {t("cases.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <a
              key={c.title}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-2 hover:shadow-2xl ${c.bg} ${c.colSpan} border border-slate-200 dark:border-slate-800`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                    {c.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{c.title as string}</h3>
                </div>
                <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="text-slate-600 dark:text-slate-300 relative z-10 font-medium">{c.desc as string}</p>
              
              {/* Interactive Mockup overlay hint */}
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-white/40 dark:bg-black/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
