import { useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  Clapperboard,
  Code2,
  HardHat,
  Lightbulb,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VocationalTest from './VocationalTest';
import LogoLoop from '@/components/ui/LogoLoop';
import { cn } from '@/lib/utils';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor: string;
}

const SpotlightCard = ({ children, className, spotlightColor }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    element.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn('group relative h-full overflow-hidden rounded-xl', className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(480px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 45%)`,
        }}
      />
      {children}
    </div>
  );
};

interface Orientacion {
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
  link: string;
  chips: string[];
  iconGradient: string;
  spotlightColor: string;
  accentText: string;
}

const orientaciones: Orientacion[] = [
  {
    icon: Code2,
    title: 'Técnico en Programación',
    description:
      'Desarrollo de software, aplicaciones web y sistemas de gestión. Lógica, bases de datos y tecnologías de vanguardia con proyectos reales desde el primer año.',
    duration: '4 años',
    link: '/programacion',
    chips: ['React', 'TypeScript', 'Node.js', 'Bases de datos'],
    iconGradient: 'from-cyan-500 to-blue-600',
    spotlightColor: 'rgba(34, 211, 238, 0.14)',
    accentText: 'text-cyan-600',
  },
  {
    icon: Clapperboard,
    title: 'Técnico en Multimedios',
    description:
      'Creación audiovisual, diseño digital, animación y síntesis de imagen para medios digitales. Producción integral de contenidos con herramientas profesionales.',
    duration: '4 años',
    link: '/multimedios',
    chips: ['Diseño digital', 'Audiovisual', 'Animación', 'Streaming'],
    iconGradient: 'from-fuchsia-500 to-purple-600',
    spotlightColor: 'rgba(232, 121, 249, 0.14)',
    accentText: 'text-fuchsia-600',
  },
];

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
];

const CarrerasSection = () => {
  const [isTestOpen, setIsTestOpen] = useState(false);

  return (
    <section id="carreras" className="bg-surface py-20" aria-labelledby="carreras-title">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-16 space-y-4 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <h2 id="carreras-title" className="font-heading text-4xl font-bold text-foreground lg:text-5xl">
            Nuestro <span className="text-primary">Plan de Estudios</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Educación técnica de 7 años: 3 años de ciclo básico común y 4 años de
            especialización en la orientación elegida.
          </p>
        </motion.div>

        {/* Ciclo Básico */}
        <motion.div
          className="mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.12)" className="card-elegant border">
            <div className="relative grid items-center gap-6 p-8 md:grid-cols-[auto_1fr_auto] lg:gap-10">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary shadow-lg transition-transform duration-300 group-hover:scale-110 md:mx-0">
                <Building2 className="h-10 w-10 text-white" aria-hidden="true" />
              </div>
              <div className="space-y-2 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <h3 className="font-heading text-2xl font-bold text-foreground">Ciclo Básico</h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    3 años
                  </span>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  Primeros 3 años comunes a todas las tecnicaturas. Formación fundamental donde
                  priorizamos el <span className="font-semibold text-foreground">hacer y reflexionar sobre lo que se hace</span>,
                  con talleres y laboratorios desde el primer día.
                </p>
              </div>
              <Button asChild variant="outline" className="justify-self-center transition-colors hover:bg-primary hover:text-primary-foreground md:justify-self-end">
                <Link to="/ciclo-basico">
                  Conocé más
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Orientaciones */}
        <motion.div
          className="mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="mb-8 text-center">
            <h3 className="mb-2 font-heading text-2xl font-bold text-foreground">
              Orientaciones del Ciclo Superior
            </h3>
            <p className="text-muted-foreground">Elegí tu especialización para los últimos 4 años</p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {orientaciones.map((orientacion, index) => (
              <motion.div
                key={orientacion.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: 0.1 + index * 0.12 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <SpotlightCard spotlightColor={orientacion.spotlightColor} className="card-elegant border">
                  <Card className="relative flex h-full flex-col border-0 bg-transparent shadow-none">
                    <CardHeader className="pb-4">
                      <div className="mb-4 flex items-start justify-between">
                        <div
                          className={cn(
                            'flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110',
                            orientacion.iconGradient
                          )}
                        >
                          <orientacion.icon className="h-8 w-8 text-white" aria-hidden="true" />
                        </div>
                        <span className={cn('rounded-full bg-secondary px-3 py-1 text-xs font-semibold', orientacion.accentText)}>
                          {orientacion.duration}
                        </span>
                      </div>
                      <CardTitle className="font-heading text-xl text-foreground">
                        {orientacion.title}
                      </CardTitle>
                      <CardDescription className="leading-relaxed">
                        {orientacion.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto space-y-5">
                      <div className="flex flex-wrap gap-2">
                        {orientacion.chips.map((chip) => (
                          <span
                            key={chip}
                            className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={orientacion.link}
                        className={cn(
                          'inline-flex items-center gap-1.5 text-sm font-semibold transition-colors',
                          orientacion.accentText
                        )}
                      >
                        Explorar orientación
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="space-y-6 rounded-2xl bg-gradient-card p-8 text-center lg:p-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="space-y-4">
            <HardHat className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
            <h3 className="font-heading text-3xl font-bold text-foreground">
              ¿No sabés qué especialidad elegir?
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Te ayudamos a descubrir tu vocación. Nuestro equipo de orientación
              educativa te acompañará en la elección de tu futuro profesional.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="btn-glow bg-gradient-primary px-8 py-3 font-bold text-white hover:opacity-90"
              onClick={() => setIsTestOpen(true)}
            >
              <Lightbulb className="mr-2 h-5 w-5" aria-hidden="true" />
              Test Vocacional
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary px-8 py-3 font-bold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/contacto">Agendar Entrevista</Link>
            </Button>
          </div>
        </motion.div>

        {/* Tecnologías que se enseñan */}
        <div className="mb-8 mt-20">
          <p className="mb-6 flex items-center justify-center gap-2 text-center text-sm font-medium text-muted-foreground">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Tecnologías que se aprenden en los talleres
          </p>
          <LogoLoop
            logos={techLogos}
            speed={120}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Tecnologías que se enseñan en la escuela"
          />
        </div>
      </div>
      <VocationalTest open={isTestOpen} onOpenChange={setIsTestOpen} />
    </section>
  );
};

export default CarrerasSection;
