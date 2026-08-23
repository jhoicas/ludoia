import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TechStack } from "./components/TechStack";
import { BentoGrid } from "./components/BentoGrid";
import { QuoteModule } from "./components/QuoteModule";
import { Chatbot } from "./components/Chatbot";
import FloatingWhatsapp from "./components/FloatingWhatsapp";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <BentoGrid />
        <QuoteModule />
      </main>
      <Chatbot />
      <FloatingWhatsapp />
    </>
  );
}
