import type { Variants } from 'framer-motion';

/**
 * Motor visual compartido del sitio.
 * Toda animación de entrada debe consumir estas variantes para mantener
 * curvas y tiempos idénticos en todas las páginas.
 * Curva estándar: cubic-bezier(0.4, 0, 0.2, 1) — alineada con --transition-smooth.
 */

export const EASE_SMOOTH: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.3,
  slow: 0.4,
} as const;

export const viewportOnce = { once: true, amount: 0.3 } as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_SMOOTH },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_SMOOTH },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_SMOOTH },
  },
};
