"use client";

import { useTranslation } from "../hooks/useTranslation";
import { Server, Layout, Cloud, Database } from "lucide-react";

export function TechStack() {
  const { t } = useTranslation();

  const categories = [
    {
      title: t("tech.cat.frontend"),
      icon: <Layout className="h-6 w-6 text-blue-500" />,
      items: [
        { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB" },
        { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/black" },
        { name: "Vue", src: "https://cdn.simpleicons.org/vuedotjs/4FC08D" },
        { name: "Angular", src: "https://cdn.simpleicons.org/angular/DD0031" }
      ]
    },
    {
      title: t("tech.cat.backend"),
      icon: <Server className="h-6 w-6 text-emerald-500" />,
      items: [
        { name: ".NET", src: "https://cdn.simpleicons.org/dotnet/512BD4" },
        { name: "Golang", src: "https://cdn.simpleicons.org/go/00ADD8" },
        { name: "Python", src: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs/339933" }
      ]
    },
    {
      title: t("tech.cat.cloud"),
      icon: <Cloud className="h-6 w-6 text-indigo-500" />,
      items: [
        { name: "AWS", src: "https://cdn.simpleicons.org/amazonwebservices/232F3E" },
        { name: "Azure", src: "https://cdn.simpleicons.org/microsoftazure/0089D6" },
        { name: "Docker", src: "https://cdn.simpleicons.org/docker/2496ED" },
        { name: "Kubernetes", src: "https://cdn.simpleicons.org/kubernetes/326CE5" }
      ]
    },
    {
      title: t("tech.cat.data"),
      icon: <Database className="h-6 w-6 text-orange-500" />,
      items: [
        { name: "PostgreSQL", src: "https://cdn.simpleicons.org/postgresql/4169E1" },
        { name: "MongoDB", src: "https://cdn.simpleicons.org/mongodb/47A248" },
        { name: "Redis", src: "https://cdn.simpleicons.org/redis/DC382D" },
        { name: "OpenAI", src: "https://cdn.simpleicons.org/openai/412991" },
        { name: "Claude", src: "https://cdn.simpleicons.org/anthropic/D97757" },
        { name: "Cursor", src: "https://cdn.simpleicons.org/cursor/000000" }
      ]
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
            <div key={idx} className="flex flex-col items-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm mb-4">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-6">{cat.title}</h3>
              <div className="flex flex-col w-full gap-3">
                {cat.items.map(item => (
                  <div key={item.name} className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm w-full">
                    <img 
                      src={item.src} 
                      alt={`${item.name} logo`} 
                      className="w-5 h-5 dark:bg-white dark:rounded-sm dark:p-0.5 object-contain" 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-5 h-5 flex items-center justify-center rounded bg-slate-100 dark:bg-slate-700 text-slate-400 text-[10px] font-bold">
                      {item.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
