import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  /** Número de filas/tarjetas esqueleto a renderizar */
  rows?: number;
  /** Variante visual según el contexto de carga */
  variant?: 'cards' | 'table' | 'page';
  className?: string;
}

/**
 * Esqueleto de carga elegante con pulsación suave.
 * Sustituye pantallas en blanco mientras se resuelven datos o chunks lazy.
 */
const LoadingSkeleton = ({ rows = 3, variant = 'cards', className }: LoadingSkeletonProps) => {
  if (variant === 'page') {
    return (
      <div
        className={cn('container mx-auto space-y-8 px-4 py-32 sm:px-6 lg:px-8', className)}
        role="status"
        aria-live="polite"
        aria-label="Cargando contenido"
      >
        <div className="space-y-4">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div
        className={cn('space-y-3', className)}
        role="status"
        aria-live="polite"
        aria-label="Cargando tabla"
      >
        <Skeleton className="h-10 w-full rounded-lg" />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn('grid gap-6 md:grid-cols-2 lg:grid-cols-3', className)}
      role="status"
      aria-live="polite"
      aria-label="Cargando tarjetas"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-2xl border border-border/50 p-6">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
