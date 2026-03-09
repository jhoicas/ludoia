\"use client\";

import { useState } from \"react\";
import { Menu, X, ArrowRight } from \"lucide-react\";
import { DialCallButton } from \"./DialCallButton\";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "ERP Modular", href: "#erp" },
  { label: "Módulos", href: "#modulos" },
  { label: "Software a la Medida", href: "#software-medida" },
  { label: "Por qué Ludoia", href: "#por-que" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <a
          href="#inicio"
          className="flex items-center gap-2"
          aria-label="Ludoia - ERP en Colombia"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <span className="text-lg font-semibold">L</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight text-slate-900">
              Ludoia
            </span>
            <span className="text-xs text-slate-500">
              Software empresarial en la nube
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-blue-600"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <DialCallButton
            label="Agendar llamada"
            icon={ArrowRight}
            className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80"
          />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir menú de navegación"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-3 md:px-6 lg:px-8">
            <ul className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-lg px-3 py-2 transition-colors hover:bg-slate-50 hover:text-blue-600"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <DialCallButton
              label="Agendar llamada estratégica"
              icon={ArrowRight}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80"
            />
          </div>
        </div>
      )}
    </header>
  );
}

