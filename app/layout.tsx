import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ludoia | Desarrollo de Software a la Medida en Colombia",
  description: "Construimos software empresarial personalizado para LATAM. Desarrollo ágil, diseño ergonómico y soluciones digitales escalables a tu medida.",
  keywords: ["Desarrollo de software a la medida Colombia", "Software empresarial personalizado LATAM", "Desarrollo de aplicaciones web y móviles", "Fábrica de software"],
  authors: [{ name: "Ludoia", url: "https://ludoia.com" }],
  robots: "index, follow",
  alternates: { canonical: "https://ludoia.com" },
  openGraph: {
    title: "Ludoia | Software a la Medida",
    description: "Desarrollo de aplicaciones empresariales ergonómicas y escalables.",
    url: "https://ludoia.com",
    siteName: "Ludoia",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ludoia | Software a la Medida",
    description: "Desarrollo ágil de software corporativo en LATAM.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

