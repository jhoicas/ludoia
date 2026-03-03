import { CheckCircle2, FileText, Package, Users } from "lucide-react";

export function AboutSection() {
  return (
    <section id="quienes-somos" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              ¿Quiénes somos en Ludoia?
            </h2>
            <p className="text-sm text-slate-600 md:text-base">
              Ludoia nace como homenaje al espíritu emprendedor de su fundador,
              con la misión de construir{" "}
              <strong>software empresarial en la nube</strong> robusto, escalable
              y pensado para la realidad de las empresas en Colombia. Creamos{" "}
              <strong>software ERP modular</strong> y{" "}
              <strong>desarrollo de software a la medida</strong> orientado a
              resultados, no a complejidad innecesaria.
            </p>
            <p className="text-sm text-slate-600 md:text-base">
              Acompañamos a empresas que buscan{" "}
              <strong>automatizar procesos</strong>, cumplir la normativa de{" "}
              <strong>facturación electrónica en Colombia</strong>, controlar
              inventarios y gestionar clientes en una sola plataforma.
            </p>
            <dl className="grid gap-4 sm:grid-cols-2">
              <Feature
                icon={CheckCircle2}
                title="Automatización de procesos"
                description="Flujos diseñados para reducir tareas manuales y errores operativos."
              />
              <Feature
                icon={FileText}
                title="Cumplimiento normativo"
                description="Facturación electrónica alineada a la DIAN y requisitos locales."
              />
              <Feature
                icon={Package}
                title="Control de inventarios"
                description="Visibilidad en tiempo real de existencias y movimientos."
              />
              <Feature
                icon={Users}
                title="Gestión de clientes (CRM)"
                description="Historial comercial completo, oportunidades y seguimiento."
              />
            </dl>
          </div>
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              En una frase
            </p>
            <p className="text-sm text-slate-700 md:text-base">
              Somos tu aliado tecnológico para{" "}
              <strong>digitalizar la operación</strong> sin perder el control de
              tu negocio. Combinamos{" "}
              <strong>ERP en Colombia, software de inventario</strong> y{" "}
              <strong>CRM para empresas</strong> bajo un enfoque modular y
              escalable.
            </p>
            <p className="text-xs text-slate-500">
              Ideal para empresas B2B que necesitan orden, trazabilidad y visión
              clara de su operación sin proyectos eternos ni costos
              impredecibles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type FeatureProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white p-3 text-sm shadow-sm shadow-slate-100 ring-1 ring-slate-200/70">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <dt className="font-semibold text-slate-900">{title}</dt>
        <dd className="text-xs text-slate-600">{description}</dd>
      </div>
    </div>
  );
}

