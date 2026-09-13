# Benchmark & Audit Report — Enterprise Tier-1 Overhaul

**Proyecto:** Plataforma institucional E.E.S.T. N°7 "Manuel Sadosky" (Lomas de Zamora)
**Rama:** `feature/enterprise-tier1-overhaul` · **Fecha:** 2026-09-12/13
**Stack:** React 18 + TypeScript + Vite 5 + Tailwind CSS 3 + shadcn/ui + Framer Motion

---

## 1. Métricas: ANTES vs. DESPUÉS

### Bundle JavaScript (`npm run build`)

| Métrica | Antes | Después | Δ |
|---|---|---|---|
| Chunk principal `index-*.js` | **1,333.61 kB** (378.74 kB gzip) | **137.44 kB** (39.94 kB gzip) | **−89.7%** |
| Cantidad de chunks JS | 1 monolítico | 45+ granulares por ruta/vendor | — |
| Warning de Vite (>500 kB) | ⚠️ Sí | ✅ Ninguno | — |
| `vendor-charts` (recharts, 399.92 kB) | En el bundle inicial | Solo se descarga en `/admin/reports` | bajo demanda |
| Panel admin completo | En el bundle inicial | Chunks lazy de 1.6–13.3 kB c/u | bajo demanda |

**Carga inicial estimada (Home):** index (137 kB) + vendor-react (142 kB) + vendor-router (22 kB) + vendor-motion (117 kB) + vendor-radix (138 kB) + vendor-icons (62 kB) ≈ **618 kB raw / ~190 kB gzip** vs. 1,334 kB / 379 kB gzip antes → **≈ −54% raw / −50% gzip**, y todo lo demás (admin, campus, charts, páginas internas) queda fuera del camino crítico.

### Assets multimedia

| Asset | Antes | Después (WebP) | Δ |
|---|---|---|---|
| `biblioteca` | 4,379 kB JPG | 334 kB | −92% |
| `entrada` | 3,478 kB JPG | ~200 kB | −94% |
| `cocina` | 3,463 kB JPG | 195 kB | −94% |
| `direccion` | 3,376 kB JPG | ~200 kB | −94% |
| `secretaria` | 3,017 kB JPG | 213 kB | −93% |
| `ftotoperfilAgua` | 1,488 kB JPG | WebP optimizado | ≈ −90% |
| `fotoalumnos` | 703 kB PNG | WebP optimizado | — |

**Total imágenes pesadas: ~20 MB → ~1.5 MB** (originales JPG/PNG preservados en `src/assets/` como fuente).

### Calidad de código

| Métrica | Antes | Después |
|---|---|---|
| `tsc --noEmit` | ✅ 0 errores | ✅ 0 errores |
| `any` en páginas admin/campus | 20+ ocurrencias | **0** (tipadas vía `src/types/admin.ts`) |
| Fetch wrappers duplicados | 4 copias locales | **1 capa única** `src/lib/api.ts` |
| Archivos huérfanos/duplicados | 7 | **0** (eliminados) |
| Navegación Header | `<a href>` (recarga full-page) | `<NavLink>` SPA + indicador animado |
| `index.html` | `lang="en"`, metas de lovable.dev | `lang="es"`, OG/Twitter institucionales |
| Rutas admin rotas (link sin ruta) | `/admin/radio` sin ruta | Rutas `radio`, `events`, `student-centers` agregadas |

---

## 2. Catálogo de componentes y módulos nuevos

| Archivo | Propósito |
|---|---|
| `src/lib/api.ts` | `apiFetch<T>()` tipado + `ApiError` con status HTTP |
| `src/types/admin.ts` | 16 interfaces de dominio (Setting, SchoolEvent, ReportData, Enrollment, CampusGrade…) |
| `src/lib/animations.ts` | Variantes Framer Motion unificadas (`fadeUp`, `staggerContainer`, `viewportOnce`) |
| `src/components/layouts/PublicLayout.tsx` | Chrome público compartido (Header + Outlet + Footer) vía ruta layout |
| `src/components/PageHeader.tsx` | Cabecera universal: breadcrumb accesible, badge, título con gradiente |
| `src/components/common/LoadingSkeleton.tsx` | Skeletons `cards` / `table` / `page` con ARIA live |

### Rediseños destacados (Fase 6, ya integrados)

- **HeroSection:** canvas interactivo `Squares` con respuesta al mouse, badge glass, BlurText, CTA con micro-bordes luminosos.
- **CarrerasSection:** `SpotlightCard` con glow radial que sigue el puntero, stagger al entrar al viewport, especialidades diferenciadas (Programación cian / Multimedios fucsia).
- **FeaturesSection:** bento grid asimétrico con tarjeta destacada de laboratorios.
- **NoticiasSection:** iframe RSS con `loading="lazy"` + skeleton de dimensiones idénticas.
- **TourVirtual / Testimonios:** imágenes WebP optimizadas, `loading="lazy"`, `decoding="async"`.

---

## 3. Archivos eliminados (autorizados en la directiva)

`HomePage.tsx`, `CicloBasicoPage.tsx`, `MultimediosPage.tsx`, `HistoriaPage.tsx`, `ContactoPage.tsx` (duplicados en `components/`), `pages/TermsOfUsePage.old.tsx`, `components/GooeyNav.tsx`.

## 4. Dependencias

No se instalaron paquetes nuevos: el proyecto ya incluía `framer-motion`, `lucide-react`, `@radix-ui/*`, `@tanstack/react-query`, `recharts`. La optimización de imágenes se resolvió con los assets `.webp` ya generados en `src/assets/`.

## 5. Guía de arquitectura para futuros desarrolladores

1. **Nueva página pública:** crear en `src/pages/`, agregar `lazy()` + ruta dentro de `<Route element={<PublicLayout />}>` en `App.tsx`. **No** importar Header/Footer: ya los provee el layout.
2. **Cabeceras de página interna:** usar `PageHeader` (badge/title/highlight/description/breadcrumb).
3. **Datos del backend:** siempre `apiFetch<T>()` con tipo explícito; declarar la entidad en `src/types/admin.ts`.
4. **Estados de carga:** `LoadingSkeleton` (variantes `cards`/`table`/`page`); nunca pantalla en blanco ni texto plano "Cargando…".
5. **Animaciones:** importar variantes de `src/lib/animations.ts`; no redefinir curvas bezier sueltas.
6. **Imágenes:** servir WebP (máx. 1920 px banners / 800 px tarjetas) con `loading="lazy"` y `decoding="async"`.
7. **Admin:** toda ruta nueva se cuelga de `/admin` con `AdminLayout` y se registra en el sidebar de `AdminLayout.tsx`.

## 6. Pendientes conocidos (fuera de alcance)

- `components/ui/LogoLoop.tsx` conserva `as any` internos (componente vendorizado de terceros; refactor de tipos de unión discriminada recomendado a futuro).
- CRUD de Eventos/Radio/Centros en admin: páginas listadas y tipadas, acciones de crear/editar/borrar pendientes de backend.
- Tests unitarios (Vitest) y regla ESLint `no-explicit-any: error` recomendados como siguiente iteración.
