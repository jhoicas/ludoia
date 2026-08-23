"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DialCallButton } from "./DialCallButton";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Casos de Éxito", href: "#casos" },
  { label: "Cotizador", href: "#cotizador" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2" aria-label="Ludoia - Software a la Medida">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <span className="text-lg font-semibold">L</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">Ludoia</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Software a la Medida</span>
          </div>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-300">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <a
              href="#cotizador"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Get Started
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 p-2 text-slate-700 dark:text-slate-300 shadow-sm transition hover:bg-slate-50 dark:hover:bg-slate-800"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 md:px-6 lg:px-8">
            <ul className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-lg px-3 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#cotizador"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              onClick={() => setOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
