import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./hooks/useTranslation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ludoia | Global Quality Custom Software Development",
  description: "We modernize processes through ergonomic digital solutions for enterprises transforming industries worldwide.",
  keywords: ["Custom software development company", "Enterprise custom web apps", "Desarrollo de software a la medida", "Global software engineering"],
  authors: [{ name: "Ludoia", url: "https://ludoia.com" }],
  robots: "index, follow",
  alternates: { 
    canonical: "https://ludoia.com",
    languages: {
      "es": "https://ludoia.com/es",
      "en": "https://ludoia.com/en",
    }
  },
  openGraph: {
    title: "Ludoia | Custom Software Development",
    description: "Enterprise applications that scale globally.",
    url: "https://ludoia.com",
    siteName: "Ludoia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ludoia | Software Engineering",
    description: "Global quality custom software for modern enterprises.",
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300">
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

