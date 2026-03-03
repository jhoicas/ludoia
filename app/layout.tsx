import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ERP Modular en Colombia | Ludoia Software Empresarial",
  description:
    "ERP modular con facturación electrónica, inventario y CRM. Software empresarial en la nube y desarrollo a la medida en Colombia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}

