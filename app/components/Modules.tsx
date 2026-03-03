import {
  FileText,
  Warehouse,
  Users,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export function ModulesSection() {
  return (
    <section
      id="modulos"
      className="border-b border-slate-200 bg-white py-10 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Módulos disponibles del ERP Ludoia
            </h2>
            <p className="max-w-2xl text-sm text-slate-600 md:text-base">
              Elige los módulos que tu empresa necesita hoy y agrégalos de forma
              progresiva. Todos se conectan al mismo{" "}
              <strong>software empresarial en la nube</strong> para mantener un
              único origen de información.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-700 ring-1 ring-inset ring-blue-200">
            <Sparkles className="h-3.5 w-3.5" />
            ERP modular · Activación por etapas
          </span>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <ModuleCard
            icon={FileText}
            title="Facturación Electrónica"
            accent="bg-blue-50 text-blue-700"
            demoLabel="Ver Demo Facturación"
          >
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>✓ Cumplimiento DIAN y normatividad vigente en Colombia.</li>
              <li>✓ Emisión y recepción de facturas electrónicas.</li>
              <li>✓ Gestión de notas crédito y débito.</li>
              <li>✓ Reportes de ventas y estados de facturación.</li>
            </ul>
          </ModuleCard>

          <ModuleCard
            icon={Warehouse}
            title="Inventario Inteligente"
            accent="bg-emerald-50 text-emerald-700"
            demoLabel="Ver Demo Inventario"
          >
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>✓ Control de inventario en tiempo real.</li>
              <li>✓ Kardex automático por producto.</li>
              <li>✓ Alertas de reposición configurables.</li>
              <li>✓ Manejo de múltiples bodegas y ubicaciones.</li>
            </ul>
          </ModuleCard>

          <ModuleCard
            icon={Users}
            title="CRM Empresarial"
            accent="bg-purple-50 text-purple-700"
            demoLabel="Ver Demo CRM"
          >
            <ul className="space-y-1.5 text-sm text-slate-600">
              <li>✓ Gestión centralizada de clientes y contactos.</li>
              <li>✓ Seguimiento de oportunidades y pipeline de ventas.</li>
              <li>✓ Historial comercial y actividades por cuenta.</li>
              <li>✓ Reportes de ventas y analítica básica.</li>
            </ul>
          </ModuleCard>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-600 md:text-sm">
          <p>
            <strong>Próximos módulos:</strong> Nómina, Contabilidad, Compras,
            Producción.
          </p>
          <p className="text-xs text-slate-500">
            Diseñados para integrarse al core de tu ERP sin interrupciones.
          </p>
        </div>
      </div>
    </section>
  );
}

type ModuleCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  accent: string;
  demoLabel: string;
  children: React.ReactNode;
};

function ModuleCard({
  icon: Icon,
  title,
  accent,
  demoLabel,
  children,
}: ModuleCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-xl ${accent}`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        </div>
      </div>
      <div className="flex-1">{children}</div>
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          {demoLabel}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}

