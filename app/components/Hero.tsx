"use client";

import { useTranslation } from "../hooks/useTranslation";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="inicio" className="relative overflow-hidden bg-white dark:bg-slate-950 pt-16 md:pt-24 lg:pt-32 pb-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 md:text-xl">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#cotizador"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:scale-105"
            >
              {t("hero.ctaPrimary")}
            </a>
            <a
              href="#casos"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 px-8 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
