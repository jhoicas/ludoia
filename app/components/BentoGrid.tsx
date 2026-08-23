import { ExternalLink } from "lucide-react";

export function BentoGrid() {
  const cases = [
    {
      title: "Agendador",
      url: "https://agendador.ludoia.com/",
      desc: "Sistema de gestión, programación inteligente y optimización de citas.",
      colSpan: "col-span-1 md:col-span-2",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "SystemTravels",
      url: "https://systemtravels.app/",
      desc: "Plataforma integral para la gestión operativa y comercial de agencias de viajes.",
      colSpan: "col-span-1 md:col-span-1",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      title: "StockIA",
      url: "https://stock.ludoia.com/",
      desc: "Control y gestión de inventario predictivo con IA.",
      colSpan: "col-span-1 md:col-span-1",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      title: "CRM Empresarial",
      url: "#",
      desc: "Plataforma a la medida para centralizar clientes, leads y fuerza de ventas.",
      colSpan: "col-span-1 md:col-span-2",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <section id="casos" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Casos de Éxito a la Medida
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Ecosistema de soluciones construidas para resolver fricciones operativas reales.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <a
              key={c.title}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-1 hover:shadow-xl ${c.bg} ${c.colSpan} border border-slate-200 dark:border-slate-800`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{c.title}</h3>
                <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <p className="text-slate-600 dark:text-slate-300 relative z-10">{c.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
