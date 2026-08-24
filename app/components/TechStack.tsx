"use client";

import { useTranslation } from "../hooks/useTranslation";
import { Server, Layout, Cloud, Database, Bot, BrainCircuit, Box, Cpu } from "lucide-react";

export function TechStack() {
  const { t } = useTranslation();

  const categories = [
    {
      title: t("tech.cat.frontend"),
      icon: <Layout className="h-6 w-6 text-blue-500" />,
      items: [
        { name: "React", src: "/icons/tech/react.svg" },
        { name: "Next.js", src: "/icons/tech/nextjs.svg" },
        { name: "Vue", src: "/icons/tech/vue.svg" },
        { name: "Angular", src: "/icons/tech/angular.svg" }
      ]
    },
    {
      title: t("tech.cat.backend"),
      icon: <Server className="h-6 w-6 text-emerald-500" />,
      items: [
        { name: ".NET", src: "/icons/tech/dotnet.svg" },
        { name: "Golang", src: "/icons/tech/golang.svg" },
        { name: "Python", src: "/icons/tech/python.svg" },
        { name: "Node.js", src: "/icons/tech/nodejs.svg" }
      ]
    },
    {
      title: t("tech.cat.cloud"),
      icon: <Cloud className="h-6 w-6 text-indigo-500" />,
      items: [
        { name: "AWS", icon: <Cloud className="w-5 h-5 text-slate-700 dark:text-slate-200" /> },
        { name: "Azure", icon: <Box className="w-5 h-5 text-blue-500" /> },
        { name: "Docker", src: "/icons/tech/docker.svg" },
        { name: "Kubernetes", src: "/icons/tech/kubernetes.svg" }
      ]
    },
    {
      title: t("tech.cat.data"),
      icon: <Database className="h-6 w-6 text-orange-500" />,
      items: [
        { name: "PostgreSQL", src: "/icons/tech/postgresql.svg" },
        { name: "SQL Server", src: "/icons/tech/sql-server.svg" },
        { name: "MongoDB", src: "/icons/tech/mongodb.svg" },
        { name: "Azure Cosmos DB", icon: <Database className="w-5 h-5 text-blue-500" /> },
        { name: "IBM DB2", src: "/icons/tech/ibm-db2.svg" },
        { name: "Redis", src: "/icons/tech/redis.svg" },
        { name: "OpenAI", src: "/icons/tech/openai.svg" },
        { name: "Claude", src: "/icons/tech/claude.svg" },
        { name: "Cursor", src: "/icons/tech/cursor.svg" }
      ]
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          {t("tech.title")}
        </h2>
        
        <div className="mb-12 max-w-2xl mx-auto">
          <p className="text-sm md:text-base font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 py-3 px-6 rounded-full border border-slate-200 dark:border-slate-700">
            {t("tech.team_exp")}
          </p>
        </div>
        
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
                    {item.icon ? (
                      <div className="w-5 h-5 flex items-center justify-center">
                        {item.icon}
                      </div>
                    ) : (
                      <>
                        <img 
                          src={item.src} 
                          alt={`${item.name} logo`}
                          width={20}
                          height={20}
                          className="w-5 h-5 dark:bg-white dark:rounded-sm dark:p-0.5 object-contain" 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden w-5 h-5 flex items-center justify-center text-slate-400">
                          <Cpu className="w-5 h-5" />
                        </div>
                      </>
                    )}
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
