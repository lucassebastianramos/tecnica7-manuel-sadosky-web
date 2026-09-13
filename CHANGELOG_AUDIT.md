# CHANGELOG — Auditoría y Rediseño Profundo del Frontend

**Fecha:** 2026-09-13
**Rama:** `feature/kimi-frontend-overhaul`
**Alcance:** `frontend/` (React 18 + TypeScript + Vite 5 + Tailwind CSS + shadcn/ui)

---

## 1. Resumen ejecutivo

Se ejecutó la auditoría completa del frontend de la plataforma institucional de la
E.E.S.T. N°7 "Manuel Sadosky" y se aplicaron las cinco fases del plan de refactorización:
limpieza de repo, code splitting, navegación SPA accesible, optimización de assets y
rediseño visual del Home. El build compila en verde (`tsc --noEmit` sin errores, Vite
sin warnings de chunk size) y el chunk principal quedó en **136 kB** (objetivo: < 300 kB).

## 2. Métricas (antes → después)

| Métrica | Antes | Después |
|---|---|---|
| JS de carga inicial | 1 chunk de **1.333 kB** (379 kB gzip) | **~656 kB en 7 chunks** paralelos y cacheables (~205 kB gzip) |
| Chunk principal (`index`) | 1.333 kB | **136 kB** (39,7 kB gzip) |
| `recharts` (panel admin) | en el bundle inicial | chunk `vendor-charts` (400 kB) que **solo se descarga en `/admin/reports`** |
| Imágenes pesadas en el bundle | **~21,5 MB** (JPG/PNG) | **~1,1 MB** (WebP, máx. 1920px) |
| Warning de chunk > 500 kB | Sí | **Ninguno** |
| Navegación | `<a href>` (recarga completa) | SPA con `<NavLink>` (sin recargas) |
| `index.html` | `lang="en"`, metadatos de Lovable | `lang="es"`, metadatos institucionales |

Detalle de chunks finales (raw / gzip):

| Chunk | Raw | Gzip | Cuándo se descarga |
|---|---|---|---|
| `index` (Home) | 136 kB | 40 kB | siempre |
| `vendor-react` | 142 kB | 46 kB | siempre |
| `vendor-radix` | 138 kB | 44 kB | siempre |
| `vendor-motion` | 117 kB | 39 kB | siempre |
| `vendor-icons` | 62 kB | 17 kB | siempre |
| `vendor-query` | 39 kB | 12 kB | siempre |
| `vendor-router` | 22 kB | 8 kB | siempre |
| `vendor-charts` | 400 kB | 108 kB | solo `/admin/reports` |
| Páginas internas | 1–20 kB c/u | — | bajo demanda por ruta |
| CSS | 90 kB | 15 kB | siempre |

Imágenes convertidas (originales preservados en `frontend/assets-originals/`, fuera del bundle):

| Asset | Antes | Después |
|---|---|---|
| `biblioteca` | 4.379 kB | 326 kB |
| `entrada` | 3.478 kB | 154 kB |
| `cocina` | 3.463 kB | 190 kB |
| `direccion` | 3.376 kB | 171 kB |
| `secretaria` | 3.017 kB | 208 kB |
| `ftotoperfilAgua` (avatar) | 1.488 kB | 21 kB |
| `fotoalumnos` | 702 kB | 44 kB |
| `hero-escuela-tecnica` | 258 kB | 160 kB (sin uso actual; no se emite) |

## 3. Cambios por fase

### Fase 1 — Limpieza y base
- **Eliminados (huérfanos/duplicados):** `components/HomePage.tsx`, `CicloBasicoPage.tsx`,
  `MultimediosPage.tsx`, `ProgramacionPage.tsx`, `HistoriaPage.tsx`, `ContactoPage.tsx`,
  `RadioPage.tsx`, `GooeyNav.tsx`, `pages/TermsOfUsePage.old.tsx`,
  `pages/PrivacyPolicyPage.tsx` (duplicado de `politica-de-privacidad.tsx`),
  `components/ShinyText/`, `components/GradientText/` (solo los importaba código muerto).
- **`frontend/index.html`:** `lang="es"`, título y metadatos institucionales, canonical,
  `og:*`/`twitter:*` propios (URL `manuelsadosky.tecnica7ldz.edu.ar`), `theme-color`,
  favicon estable en `/logo.png` (nuevo `frontend/public/logo.png`). Cero referencias a Lovable.
- **`frontend/vite.config.ts`:** `manualChunks` por función (`vendor-react`, `vendor-router`,
  `vendor-motion`, `vendor-radix`, `vendor-charts`, `vendor-query`, `vendor-gsap`,
  `vendor-icons`) + `chunkSizeWarningLimit: 700`. Se preservaron proxy `/api`,
  `assetsInclude` y `outDir: '../frontend-dist'`.

### Fase 2 — Enrutamiento SPA y arquitectura
- **`src/App.tsx`:** 30 rutas migradas a `React.lazy()` con `<Suspense>` y fallback
  institucional accesible (logo + `role="status"` + `aria-live`). Solo `Index` queda eager.
- **`src/components/Header.tsx`:** enlaces migrados a `<NavLink>` con estado activo
  (`aria-current` automático); botón hamburguesa con `aria-expanded`/`aria-controls`;
  menú móvil animado con `AnimatePresence` (entrada y salida), cierre con `Escape` y al
  navegar; targets táctiles de 44px.

### Fase 3 — Optimización de assets
- Conversión a WebP (sharp, máx. 1920px, q80) de las 8 imágenes pesadas.
- Referencias actualizadas: `pages/TourVirtual.tsx` (además: eliminados 4 imports muertos
  y `loading="lazy"`/`decoding="async"` en imágenes no prioritarias),
  `components/TestimoniosSection.tsx`, `pages/Programacion.tsx`, `pages/Multimedios.tsx`.

### Fase 4 — Rediseño visual del Home
- **`HeroSection.tsx`:** canvas interactivo `Squares` (grilla animada con hover) sobre
  fondo oscuro, badge institucional glass, titular con `BlurText` + línea con degradado,
  CTAs corregidos (antes: texto ilegible `bg-black text-primary`), tarjeta de inscripciones
  en glassmorphism, stats con stagger, indicador de scroll animado. Eliminados imports
  muertos y bloque comentado.
- **`CarrerasSection.tsx`:** tarjetas "spotlight" con glow que sigue al mouse
  (variables CSS `--mouse-x/--mouse-y`), diferenciación Programación (cyan, chips de stack)
  vs. Multimedios (fucsia, chips de contenidos), Ciclo Básico como tarjeta horizontal
  destacada, animaciones de entrada escalonadas. Se preservan `VocationalTest` y `LogoLoop`.
- **`FeaturesSection.tsx`:** bento grid de 7 tarjetas (tarjeta destacada de laboratorios a
  doble ancho). **Fix de contraste:** la sección de logros y el CTA usaban texto negro sobre
  gradiente azul oscuro (ilegible) → ahora texto blanco.
- **`NoticiasSection.tsx`:** iframe RSS con `loading="lazy"` + skeleton shadcn hasta
  `onLoad` (sin hueco blanco), alturas fijas anti-CLS, corrección de clase inválida
  (`h-30`) y de contraste del título.

### Fase 5 — Validación
- `npx tsc --noEmit` → 0 errores.
- `npm run build` → exitoso, sin warnings de chunk size; `index` = 136 kB (< 300 kB).

## 4. Instrucciones de despliegue

El Dockerfile copia `frontend-dist/` como carpeta pública del backend, por lo que el
frontend se compila en el host antes de construir la imagen:

```bash
# 1. Compilar el frontend (genera/actualiza frontend-dist/)
cd frontend
npm ci
npm run build

# 2. Volver a la raíz y reconstruir el contenedor
cd ..
docker-compose up --build -d
```

Notas:
- `frontend-dist/` queda versionado en git con los artefactos del build actual.
- El dominio `manuelsadosky.tecnica7ldz.edu.ar` ya está en `allowedHosts` de Vite (dev).

## 5. Deuda técnica pendiente (próximas iteraciones)

1. **Tipado del panel admin:** reemplazar ~20 `any` por interfaces de dominio
   (`Course`, `Enrollment`, `Setting`, `ReportData`) en `CoursesPage`, `SettingsAdminPage`,
   `ReportsPage`, `EventsAdminPage`, `RadioAdminPage`, `StudentCentersPage` y campus.
2. **`src/lib/api.ts`:** fetch wrapper único (hoy `api`/`apiCall` están duplicados en cada
   página admin).
3. **`LogoLoop.tsx`:** eliminar 13 `as any`.
4. ESLint estricto (`no-explicit-any: error`) y tests con Vitest.
5. `Chatbot.tsx` se carga eager dentro del Home (incluye `react-markdown`); candidato a
   `lazy()` diferido tras el primer render.
