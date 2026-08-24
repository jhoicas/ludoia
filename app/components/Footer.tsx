"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslation } from "../hooks/useTranslation";
import { Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            {mounted ? (
              <Image 
                src={theme === "dark" ? "/logo_darkmode.png" : "/logo_LD.png"} 
                alt="Ludoia Logo" 
                width={36} 
                height={36} 
                className="h-9 w-auto object-contain"
              />
            ) : (
              <div className="h-9 w-9 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />
            )}
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Ludoia</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Global Engineering</span>
            </div>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Ludoia Global Engineering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
