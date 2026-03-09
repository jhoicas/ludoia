import { CalendarRange, Mail, PhoneCall, PhoneOutgoing } from "lucide-react";
import { DialCallButton } from "./DialCallButton";

export function ContactSection() {
  return (
    <section
      id="contacto"
      className="border-b border-slate-200 bg-slate-50 py-10 md:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr,1fr] md:items-center">
          <div className="space-y-4">
            <h2
              id="agendar-llamada"
              className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl"
            >
              Hablemos de tu proyecto
            </h2>
            <p className="text-sm text-slate-600 md:text-base">
              Agenda una llamada estratégica para entender tu operación actual,
              los retos de tu equipo y cómo un{" "}
              <strong>ERP en Colombia</strong> junto con{" "}
              <strong>software empresarial en la nube</strong> puede ayudarte a
              crecer de forma ordenada.
            </p>
            <div className="space-y-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <CalendarRange className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Agendar llamada estratégica
                  </p>
                  <p className="text-xs text-slate-600">
                    Simulamos una integración con Calendly o tu agenda
                    corporativa.
                  </p>
                </div>
              </div>
              <DialCallButton
                label="Agendar Llamada Estratégica"
                icon={<PhoneOutgoing className="h-5 w-5" />}
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Datos de contacto
              </p>
              <div className="space-y-2 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>sales@ludoia.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-blue-600" />
                  <span>+57 (318) 383 84 17</span>
                </p>
                <p>
                  Atendemos empresas B2B que buscan centralizar{" "}
                  <strong>facturación electrónica</strong>,{" "}
                  <strong>software de inventario</strong> y{" "}
                  <strong>CRM para empresas</strong> en una sola plataforma.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-500">
              Aquí podrías incrustar tu widget de Calendly, formulario de
              contacto o integración con tu CRM actual.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

