import { Cloud, Layers, Smartphone, Workflow } from "lucide-react";

export function ProductSection() {
  return (
    <section
      id="erp"
      className="border-b border-slate-200 bg-slate-50/60 py-10 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr,1fr] md:items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Sistema ERP modular en la nube que crece contigo.
            </h2>
            <p className="text-sm text-slate-600 md:text-base">
              Ludoia ERP es un <strong>software ERP modular</strong> diseñado
              para acompañar la evolución de tu empresa. Empieza con lo
              esencial (facturación electrónica, inventario, CRM) y suma
              módulos a medida que tu operación lo necesita, sin migraciones
              traumáticas ni proyectos monolíticos.
            </p>
            <p className="text-sm text-slate-600 md:text-base">
              Nuestra arquitectura en la nube permite crecimiento progresivo,
              alta disponibilidad y acceso seguro desde cualquier lugar,
              cumpliendo con las exigencias del mercado empresarial en
              Colombia.
            </p>
            <dl className="grid gap-4 sm:grid-cols-2">
              <Item
                icon={Layers}
                title="Arquitectura escalable"
                description="Módulos independientes que se conectan bajo un mismo core ERP."
              />
              <Item
                icon={Smartphone}
                title="Acceso multidispositivo"
                description="Opera desde portátil, tablet o móvil con una sola versión de la verdad."
              />
              <Item
                icon={Workflow}
                title="Módulos activables"
                description="Activa solo lo que tu empresa necesita: facturación, inventario, CRM y más."
              />
              <Item
                icon={Cloud}
                title="Integraciones listas"
                description="Pensado para integrarse con otros sistemas, APIs y servicios futuros."
              />
            </dl>
          </div>
          <div
            id="demo-erp"
            className="space-y-4 rounded-3xl border border-blue-100 bg-white p-5 shadow-md shadow-blue-100/80"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Vista rápida de módulos ERP
            </p>
            <div className="grid gap-3 text-xs sm:grid-cols-2 sm:text-sm">
              <Card title="Facturación electrónica" badge="DIAN">
                Cumplimiento normativo con Colombia, emisión y recepción de
                documentos electrónicos.
              </Card>
              <Card title="Inventario inteligente" badge="Stock">
                Movimientos, kardex automático y visibilidad por bodega en
                tiempo real.
              </Card>
              <Card title="CRM empresarial" badge="Clientes">
                Seguimiento completo de prospectos, clientes y oportunidades
                comerciales.
              </Card>
              <Card title="Reportes gerenciales" badge="KPIs">
                Indicadores clave para decisiones rápidas y basadas en datos.
              </Card>
            </div>
            <p className="text-xs text-slate-500">
              Más que un ERP en Colombia, Ludoia es una plataforma continua de
              mejora y control de tu operación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type ItemProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

function Item({ icon: Icon, title, description }: ItemProps) {
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

type CardProps = {
  title: string;
  badge: string;
  children: React.ReactNode;
};

function Card({ title, badge, children }: CardProps) {
  return (
    <div className="space-y-1 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200/70">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
          {badge}
        </span>
      </div>
      <p className="text-xs text-slate-600">{children}</p>
    </div>
  );
}

