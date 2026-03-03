import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/About";
import { ProductSection } from "./components/Product";
import { ModulesSection } from "./components/Modules";
import { CustomSoftwareSection } from "./components/CustomSoftware";
import { WhyChooseUsSection } from "./components/WhyChooseUs";
import { ContactSection } from "./components/ContactSection";
import { FloatingWhatsapp } from "./components/FloatingWhatsapp";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ProductSection />
        <ModulesSection />
        <CustomSoftwareSection />
        <WhyChooseUsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div className="space-y-1">
          <p className="font-semibold text-slate-700">Ludoia</p>
          <p>Software empresarial en la nube · ERP en Colombia.</p>
          <p>© 2026 Ludoia. Todos los derechos reservados.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a
            href="/politica-privacidad"
            className="transition hover:text-blue-600"
          >
            Política de privacidad
          </a>
          <a
            href="/terminos-condiciones"
            className="transition hover:text-blue-600"
          >
            Términos y condiciones
          </a>
        </div>
      </div>
    </footer>
  );
}

