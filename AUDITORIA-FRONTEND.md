# Auditoría Frontend — E.E.S.T. N°7 "Manuel Sadosky"

**Fecha:** 2026-09-12 · **Alcance:** `frontend/` (React 18 + TypeScript + Vite 5 + Tailwind + shadcn/ui)

---

## 1. Resumen Ejecutivo

El frontend compila sin errores de tipos (`tsc --noEmit` ✅) y el build de producción funciona, pero presenta **problemas severos de performance de carga, navegación SPA rota, código muerto y tipado débil en el panel admin**. La identidad visual no refleja el perfil tecnológico de la escuela (Programación / Multimedios).

### Hallazgos críticos (impacto alto)

| # | Problema | Evidencia | Impacto |
|---|----------|-----------|---------|
| 1 | **Bundle monolítico: 1 chunk JS de 1.33 MB** (379 KB gzip) | `vite build` → `index-*.js 1,333.61 kB` + warning de chunk > 500 kB | Toda la app (incl. admin, campus, recharts) se descarga en la primera visita |
| 2 | **~20 MB de imágenes sin optimizar** | `biblioteca.jpg` 4.4 MB, `entrada.jpg` 3.5 MB, `cocina.jpg` 3.5 MB, `direccion.jpg` 3.4 MB, `secretaria.jpg` 3.0 MB, `ftotoperfilAgua.jpg` 1.5 MB | LCP pésimo en Tour Virtual y Testimonios |
| 3 | **Navegación con `<a href>` en el Header** | `Header.tsx` líneas 125-131 y 158-165 | Recarga completa de página en cada navegación: se pierde el beneficio de la SPA |
| 4 | **Sin lazy loading de rutas** | `App.tsx` importa las 30 páginas eager | Todo el código llega al bundle inicial |
| 5 | **Código muerto / páginas duplicadas** | `components/HomePage.tsx`, `components/CicloBasicoPage.tsx`, `components/MultimediosPage.tsx`, `components/HistoriaPage.tsx`, `components/ContactoPage.tsx` (duplicados de `pages/`), `pages/TermsOfUsePage.old.tsx`, `components/GooeyNav.tsx` (sin uso) | Confusión, deuda técnica |
| 6 | **HTML base incorrecto** | `index.html`: `lang="en"` (debe ser `es`), meta OG/Twitter apuntando a `lovable.dev` | SEO/accesibilidad, branding ajeno |

### Hallazgos medios

- **`any` generalizado en el panel admin** (`CoursesPage`, `SettingsAdminPage`, `ReportsPage`, `EventsAdminPage`, `RadioAdminPage`, `StudentCentersPage`, campus) y en `ui/LogoLoop.tsx` (13 ocurrencias de `as any`).
- **Imports muertos**: `Index.tsx` importa 7 íconos lucide + `motion` sin usar; `HeroSection.tsx` importa `heroImage`, `ShinyText`, `GradientText` sin usar y tiene un bloque comentado.
- **A11y**: botón de menú móvil sin `aria-expanded`/`aria-controls`; menú móvil sin animación de salida; sliders con dots de 12 px (target táctil pequeño).
- **Contraste**: `FeaturesSection` usa texto negro sobre `bg-gradient-primary` (azul oscuro) → ratio de contraste insuficiente; `NoticiasSection` título negro sobre gradiente gris.
- **RSS iframe** de noticias sin lazy-loading ni skeleton (bloquea y deja hueco blanco mientras carga).
- **Duplicación de lógica fetch** en páginas admin (`api`/`apiCall` copiadas en cada página).

### Oportunidades de diseño (Fase B)

- Hero actual: gradiente plano + blobs `animate-pulse` — no comunica tecnología.
- Tarjetas de especialidades idénticas entre sí; sin microinteracciones propias.
- Features: grid plano de 7 tarjetas iguales, sin jerarquía (candidata a bento grid).
- El proyecto ya incluye componentes "react-bits" sin aprovechar: `Squares` (canvas animado), `BlurText`, `MagicBento`, `LogoLoop`.

---

## 2. Plan de Acción (aplicado en esta iteración)

| Paso | Acción | Estado |
|------|--------|--------|
| 1 | `App.tsx`: `React.lazy` + `Suspense` por ruta con skeleton de carga | ✅ |
| 2 | `vite.config.ts`: `manualChunks` (vendor react, router, framer-motion, radix, recharts) | ✅ |
| 3 | `index.html`: `lang="es"`, meta OG/Twitter propios | ✅ |
| 4 | Imágenes pesadas → `.webp` optimizados (originales preservados) | ✅ |
| 5 | `HeroSection` rediseñado: canvas `Squares` interactivo + glassmorphism + jerarquía tipográfica | ✅ |
| 6 | `CarrerasSection`: tarjetas interactivas con glow seguimiento de mouse, CTA, stagger animations | ✅ |
| 7 | `FeaturesSection`: bento grid con tarjeta destacada | ✅ |
| 8 | `Header`: navegación SPA con `NavLink`, `aria-expanded`, menú móvil animado | ✅ |
| 9 | `NoticiasSection`: iframe lazy + skeleton mientras carga | ✅ |
| 10 | `TestimoniosSection` / `TourVirtual`: consumen imágenes optimizadas | ✅ |

### Pendiente recomendado (no aplicado — requiere decisión)

- **Eliminar archivos huérfanos** (requiere confirmación de borrado): `components/HomePage.tsx`, `components/CicloBasicoPage.tsx`, `components/MultimediosPage.tsx`, `components/HistoriaPage.tsx`, `components/ContactoPage.tsx`, `pages/TermsOfUsePage.old.tsx`, `components/GooeyNav.tsx`.
- **Tipar el panel admin** (reemplazar ~20 `any` por interfaces de dominio: `Course`, `Enrollment`, `Setting`, `ReportData`).
- **Extraer `lib/api.ts`** con un fetch wrapper único para las páginas admin.
- Tests (Vitest) y ESLint estricto (`no-explicit-any: error`).

---

## 3. Resultado medido

*(Completado tras la refactorización — ver sección final del reply / `npm run build`)*

- Antes: **1 chunk JS = 1,333 kB** (379 kB gzip), CSS 91.7 kB, imágenes pesadas en assets.
- Después: ver build final en la conversación.
