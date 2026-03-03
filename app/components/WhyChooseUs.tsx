import { CheckCircle2, Clock3, Headset, ShieldCheck } from "lucide-react";

export function WhyChooseUsSection() {
  return (
    <section
      id="por-que"
      className="border-b border-slate-200 bg-white py-10 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-6 space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            ¿Por qué elegir Ludoia para tu ERP?
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-slate-600 md:text-base">
            Combinamos una arquitectura moderna en la nube con{" "}
            <strong>módulos activables</strong> y{" "}
            <strong>desarrollo de software a la medida</strong> para adaptarnos
            a la forma en la que tu negocio ya opera.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Benefit
            icon={CheckCircle2}
            title="Arquitectura moderna"
            description="ERP modular, APIs limpias y componentes listos para integrarse con otros sistemas."
          />
          <Benefit
            icon={ShieldCheck}
            title="100% nube"
            description="Olvídate de servidores físicos y mantenimientos complejos. Todo se ejecuta en la nube."
          />
          <Benefit
            icon={Clock3}
            title="Implementaciones ágiles"
            description="Activamos primero lo crítico (facturación, inventario, CRM) y luego escalamos."
          />
          <Benefit
            icon={Headset}
            title="Soporte cercano"
            description="Acompañamiento en español, pensado para equipos operativos y gerenciales."
          />
          <Benefit
            icon={CheckCircle2}
            title="Módulos activables"
            description="Paga solo por lo que utilizas hoy y agrega más capacidades cuando las necesites."
          />
          <Benefit
            icon={CheckCircle2}
            title="Desarrollo a la medida"
            description="Cuando un estándar no alcanza, construimos la pieza exacta que tu operación requiere."
          />
        </div>
      </div>
    </section>
  );
}

type BenefitProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

function Benefit({ icon: Icon, title, description }: BenefitProps) {
  return (
    <article className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm shadow-sm">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-xs text-slate-600">{description}</p>
      </div>
    </article>
  );
}

