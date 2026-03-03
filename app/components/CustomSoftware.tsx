import { Code2, GitBranch, Network, Settings2 } from "lucide-react";

export function CustomSoftwareSection() {
  return (
    <section
      id="software-medida"
      className="border-b border-slate-200 bg-slate-50 py-10 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr,1fr] md:items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Desarrollo de software a la medida para tu operación.
            </h2>
            <p className="text-sm text-slate-600 md:text-base">
              Cuando tu negocio requiere algo más que un ERP tradicional,
              Ludoia te acompaña con{" "}
              <strong>desarrollo de software a la medida</strong>. Construimos
              sistemas internos, APIs y plataformas web que conversan con tu
              ERP y otros sistemas existentes.
            </p>
            <p className="text-sm text-slate-600 md:text-base">
              Diseñamos soluciones escalables que respetan tus procesos actuales
              y los llevan a un siguiente nivel, manteniendo el control y la
              trazabilidad que tu equipo necesita.
            </p>
            <dl className="grid gap-3 sm:grid-cols-2">
              <Item
                icon={Settings2}
                label="Automatización de procesos específicos"
              />
              <Item icon={Network} label="Integración con sistemas existentes" />
              <Item icon={Code2} label="Plataformas web y portales B2B" />
              <Item icon={GitBranch} label="APIs y servicios especializados" />
            </dl>
          </div>
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Software a la medida + ERP
            </p>
            <p className="text-sm text-slate-700 md:text-base">
              Combinamos un <strong>ERP en la nube</strong> con piezas de{" "}
              <strong>software empresarial a la medida</strong> para que no
              tengas que elegir entre rigidez o caos de hojas de cálculo.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                ✓ Diseñamos junto a tu equipo los flujos clave del negocio.
              </li>
              <li>✓ Priorizamos entregas iterativas con valor medible.</li>
              <li>✓ Documentamos APIs y procesos para facilitar soporte.</li>
              <li>
                ✓ Pensamos desde el día uno en escalabilidad y seguridad.
              </li>
            </ul>
            <div className="pt-2">
              <a
                href="#agendar-llamada"
                className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Solicitar cotización
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ItemProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
};

function Item({ icon: Icon, label }: ItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 text-sm shadow-sm shadow-slate-100 ring-1 ring-slate-200/70">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-slate-800">{label}</p>
    </div>
  );
}

