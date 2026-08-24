"use client";

import { useTranslation } from "../hooks/useTranslation";
import { Server, Layout, Cloud, Database } from "lucide-react";

export function TechStack() {
  const { t } = useTranslation();

  const categories = [
    {
      title: t("tech.cat.frontend"),
      icon: <Layout className="h-6 w-6 text-blue-500" />,
      items: ["React", "Next.js", "Vue", "Angular", "Tailwind CSS", "TypeScript"]
    },
    {
      title: t("tech.cat.backend"),
      icon: <Server className="h-6 w-6 text-emerald-500" />,
      items: [".NET", "Golang", "Python", "Node.js"]
    },
    {
      title: t("tech.cat.cloud"),
      icon: <Cloud className="h-6 w-6 text-indigo-500" />,
      items: ["AWS", "Microsoft Azure", "DigitalOcean", "Docker", "Kubernetes"]
    },
    {
      title: t("tech.cat.data"),
      icon: <Database className="h-6 w-6 text-orange-500" />,
      items: ["PostgreSQL", "MongoDB", "Redis", "Claude AI", "OpenAI"]
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-12">
          {t("tech.title")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm mb-4">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">{cat.title}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {cat.items.map(item => (
                  <span key={item} className="px-3 py-1 text-xs font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
