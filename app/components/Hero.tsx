import { ArrowRight, PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inicio"
      className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:px-6 md:py-14 lg:flex-row lg:items-center lg:py-16">
        <div className="flex-1 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span>ERP en Colombia · Software empresarial en la nube</span>
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            ERP Modular en la Nube para Empresas en Colombia. Facturación
            Electrónica, Inventario, CRM y Más.
          </h1>
          <p className="max-w-xl text-balance text-base text-slate-600 sm:text-lg">
            Soluciones informáticas escalables y desarrollo de software a la
            medida para empresas que quieren crecer sin complicaciones. Diseñado
            para el día a día empresarial en Colombia.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#demo-erp"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:w-auto"
            >
              <PlayCircle className="h-5 w-5" />
              Ver Demo ERP
            </a>
            <a
              href="#agendar-llamada"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              <ArrowRight className="h-5 w-5" />
              Agendar una llamada
            </a>
          </div>
          <p className="text-xs text-slate-500 sm:text-sm">
            Incluimos módulos de facturación electrónica para Colombia, software
            de inventario y CRM para empresas en un solo sistema ERP modular.
          </p>
        </div>

        <div className="flex-1">
          <div className="relative mx-auto max-w-md rounded-3xl bg-white p-5 shadow-lg shadow-slate-200/70 ring-1 ring-slate-200">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                  Panel ERP Ludoia
                </p>
                <p className="text-sm text-slate-500">
                  Vista consolidada de facturación, inventario y CRM.
                </p>
              </div>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-200">
                Software ERP modular
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="space-y-2 rounded-2xl bg-slate-50 p-3">
                <p className="font-semibold text-slate-800">
                  Facturación Electrónica
                </p>
                <p className="text-slate-500">
                  Cumplimiento DIAN, emisión y seguimiento en tiempo real.
                </p>
              </div>
              <div className="space-y-2 rounded-2xl bg-slate-50 p-3">
                <p className="font-semibold text-slate-800">
                  Inventario Inteligente
                </p>
                <p className="text-slate-500">
                  Control por bodegas, kardex y alertas de reposición.
                </p>
              </div>
              <div className="space-y-2 rounded-2xl bg-blue-50 p-3">
                <p className="font-semibold text-slate-900">CRM Empresarial</p>
                <p className="text-slate-600">
                  Seguimiento de clientes, oportunidades y ventas.
                </p>
              </div>
              <div className="space-y-2 rounded-2xl bg-slate-900 p-3 text-slate-50">
                <p className="font-semibold">100% en la nube</p>
                <p className="text-slate-300">
                  Acceso seguro desde cualquier dispositivo, sin servidores
                  físicos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

