# Ludoia — Landing Page

Landing corporativa de **Ludoia**, empresa colombiana de software enfocada en ERPs en la nube y desarrollo a la medida.

## Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (íconos)

## Requisitos

- Node.js 18+
- npm o pnpm

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Build

```bash
npm run build
```

## Producción

```bash
npm start
```

## Estructura del proyecto

```
ludoia/
├── app/
│   ├── components/     # Componentes de la landing
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Product.tsx
│   │   ├── Modules.tsx
│   │   ├── CustomSoftware.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── ContactSection.tsx
│   │   └── FloatingWhatsapp.tsx
│   ├── layout.tsx     # Layout raíz y metadatos SEO
│   ├── page.tsx       # Página de inicio
│   └── globals.css
└── README.md
```

## Contenido de la landing

- **Navbar** con menú responsive y hamburguesa en móvil
- **Hero** con CTAs (Ver Demo ERP, Agendar llamada)
- **¿Quiénes somos?** — Sobre Ludoia y pilares (automatización, facturación electrónica, inventario, CRM)
- **Producto ERP** — Sistema modular en la nube
- **Módulos** — Facturación electrónica, Inventario, CRM (grid de tarjetas)
- **Software a la medida** — Desarrollo personalizado y cotización
- **¿Por qué elegirnos?** — Beneficios con íconos
- **Contacto** — Agendar llamada y datos de contacto
- **Footer** — Enlaces legales y copyright
- **Botón flotante** de WhatsApp

## Configuración

- **WhatsApp:** Edita la URL en `app/components/FloatingWhatsapp.tsx` y reemplaza `57XXXXXXXXXX` por el número real.
- **Rutas de agendar:** La página usa `/agendar-llamada`; puedes crear esa ruta e integrar Calendly o similar.

## Licencia

© 2026 Ludoia. Todos los derechos reservados.
