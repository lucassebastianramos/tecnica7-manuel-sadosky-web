import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/animations';

export interface PageBreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  badge: string;
  title: string;
  highlight?: string;
  description?: string;
  breadcrumb?: PageBreadcrumbItem[];
  className?: string;
}

const PageHeader = ({ badge, title, highlight, description, breadcrumb, className }: PageHeaderProps) => {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background pt-32 pb-12 lg:pt-36 lg:pb-16',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="space-y-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {breadcrumb && breadcrumb.length > 0 && (
            <motion.nav aria-label="Migas de pan" variants={fadeUp}>
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1 transition-colors hover:text-primary"
                  >
                    <Home className="h-3.5 w-3.5" aria-hidden="true" />
                    Inicio
                  </Link>
                </li>
                {breadcrumb.map((item) => (
                  <li key={item.label} className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.href ? (
                      <Link to={item.href} className="transition-colors hover:text-primary">
                        {item.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="font-medium text-foreground">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}

          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {badge}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-bold text-foreground lg:text-5xl"
          >
            {title}{' '}
            {highlight && (
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {highlight}
              </span>
            )}
          </motion.h1>

          {description && (
            <motion.p
              variants={fadeUp}
              className="max-w-3xl text-lg leading-relaxed text-muted-foreground"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
