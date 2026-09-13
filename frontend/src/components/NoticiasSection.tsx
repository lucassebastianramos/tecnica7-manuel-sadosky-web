import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Newspaper } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import escudotec from '../assets/escudotec.png';

const NoticiasSection = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section id="noticias" className="bg-surface py-20" aria-labelledby="noticias-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 space-y-4 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <h2 id="noticias-title" className="font-heading text-4xl font-bold text-foreground lg:text-5xl">
            Últimas <span className="text-primary">Noticias</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Novedades, eventos y la vida diaria de la comunidad de la Técnica 7.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            {!iframeLoaded && (
              <div className="absolute inset-0 space-y-6 p-6 sm:p-8" aria-hidden="true">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Skeleton className="h-44 rounded-xl" />
                  <Skeleton className="h-44 rounded-xl" />
                  <Skeleton className="h-44 rounded-xl" />
                </div>
                <Skeleton className="h-56 rounded-xl" />
              </div>
            )}
            <iframe
              src="https://rss.app/embed/v1/magazine/aNGzeHNdBWZrQWlM"
              width="100%"
              height="800"
              loading="lazy"
              onLoad={() => setIframeLoaded(true)}
              className={cn(
                'block h-[600px] w-full border-0 transition-opacity duration-500 lg:h-[800px]',
                iframeLoaded ? 'opacity-100' : 'opacity-0'
              )}
              allow="clipboard-write"
              title="Feed de noticias de Instagram de la E.E.S.T. N°7"
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <a
            href="https://www.instagram.com/tecnica7banfield/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver el perfil de Instagram de la E.E.S.T. N°7 (se abre en una pestaña nueva)"
            className="group flex w-full max-w-md items-center gap-5 rounded-2xl border border-border bg-card p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={escudotec}
              alt=""
              className="h-16 w-16 rounded-full border-2 border-pink-500 object-cover"
            />
            <div className="flex-grow">
              <p className="flex items-center gap-2 text-lg font-bold text-foreground">
                tecnica7banfield
                <Instagram className="h-4 w-4 text-pink-500" aria-hidden="true" />
              </p>
              <p className="text-sm text-muted-foreground">
                E.E.S.T. N°7 &ldquo;Manuel Sadosky&rdquo;
              </p>
            </div>
            <span className="rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-blue-600">
              Ver Perfil
            </span>
          </a>
        </motion.div>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <Newspaper className="h-4 w-4" aria-hidden="true" />
          El feed se actualiza automáticamente desde nuestro Instagram oficial.
        </p>
      </div>
    </section>
  );
};

export default NoticiasSection;
