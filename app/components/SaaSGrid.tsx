import { CheckCircle2 } from "lucide-react";

export function SaaSGrid() {
  const features = [
    "Facturación Electrónica DIAN",
    "Inventario Multibodega",
    "CRM de Ventas",
    "Reportes en Tiempo Real",
    "Nómina Electrónica",
    "Portal de Clientes",
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Características SaaS
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group flex flex-col rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-sm transition hover:shadow-md border border-slate-200 dark:border-slate-700"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{feature}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
