import {
  Users,
  Award,
  Briefcase,
  BookOpen,
  Laptop,
  Globe,
  TrendingUp,
  Cpu,
  Wrench,
  FlaskConical,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: string;
  span: string;
  featured?: boolean;
}

const features: Feature[] = [
  {
    icon: Laptop,
    title: 'Tecnología de Vanguardia',
    description:
      'Laboratorios de informática, talleres de producción audiovisual y equipamiento actualizado para el aprendizaje práctico desde el primer año.',
    stats: '6 laboratorios y talleres',
    span: 'md:col-span-2 lg:col-span-4',
    featured: true,
  },
  {
    icon: Award,
    title: 'Excelencia Académica',
    description: '110+ años formando técnicos con los más altos estándares de calidad educativa.',
    stats: '95% de empleabilidad',
    span: 'lg:col-span-2',
  },
  {
    icon: BookOpen,
    title: 'Ciclo Básico',
    description: 'Primeros 3 años comunes: formación fundamental con taller y práctica.',
    stats: 'Común a todas las orientaciones',
    span: 'lg:col-span-2',
  },
  {
    icon: Users,
    title: 'Docentes Especializados',
    description: 'Profesores con experiencia profesional y académica en cada área técnica.',
    stats: '100+ docentes expertos',
    span: 'lg:col-span-2',
  },
  {
    icon: Briefcase,
    title: 'Inserción Laboral',
    description: 'Convenios con empresas líderes para prácticas profesionales y primer empleo.',
    stats: '50+ empresas aliadas',
    span: 'lg:col-span-2',
  },
  {
    icon: Globe,
    title: 'Proyección Internacional',
    description: 'Programas de intercambio y certificaciones reconocidas internacionalmente.',
    stats: 'Certificación ISO',
    span: 'lg:col-span-3',
  },
  {
    icon: TrendingUp,
    title: 'Formación Continua',
    description: 'Cursos de capacitación y actualización profesional para egresados y comunidad.',
    stats: 'Educación permanente',
    span: 'lg:col-span-3',
  },
];

const labHighlights = [
  { icon: Cpu, label: 'Laboratorio de Programación' },
  { icon: Wrench, label: 'Taller de Multimedios' },
  { icon: FlaskConical, label: 'Laboratorio de Ciencias' },
];

const achievements = [
  { number: '500+', label: 'Estudiantes Activos' },
  { number: '110+', label: 'Años de Trayectoria' },
  { number: 'Miles de', label: 'Egresados' },
  { number: '100+', label: 'Docentes y Técnicos' },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const FeaturesSection = () => {
  return (
    <section id="institucional" className="bg-background py-20" aria-labelledby="features-title">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-16 space-y-4 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <h2 id="features-title" className="font-heading text-4xl font-bold text-foreground lg:text-5xl">
            ¿Por qué elegir la <span className="text-primary">E.E.S.T. N°7</span>?
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Somos una institución líder en educación técnica, comprometida con la
            formación integral de nuestros estudiantes y su inserción exitosa en el mundo laboral.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              variants={item}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={cn(
                'card-elegant group relative flex flex-col overflow-hidden rounded-2xl border p-6',
                feature.featured && 'bg-gradient-card',
                feature.span
              )}
            >
              {feature.featured ? (
                <div className="grid h-full gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <feature.icon className="h-7 w-7 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground">{feature.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                    <p className="text-sm font-semibold text-primary">{feature.stats}</p>
                  </div>
                  <ul className="flex flex-col justify-center gap-3">
                    {labHighlights.map((lab) => (
                      <li
                        key={lab.label}
                        className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3"
                      >
                        <lab.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                        <span className="text-sm font-medium text-foreground">{lab.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex h-full flex-col space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  <p className="mt-auto pt-2 text-sm font-semibold text-primary">{feature.stats}</p>
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="rounded-3xl bg-gradient-primary p-8 text-white lg:p-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-12 space-y-6 text-center">
            <h3 className="font-heading text-3xl font-bold lg:text-4xl">
              Nuestra Trayectoria en Números
            </h3>
            <p className="mx-auto max-w-2xl text-xl text-white/85">
              Más de un siglo de compromiso con la educación técnica de calidad,
              formando profesionales que lideran el desarrollo tecnológico.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {achievements.map((achievement) => (
              <div key={achievement.label} className="space-y-2 text-center">
                <div className="font-heading text-4xl font-bold lg:text-5xl">
                  {achievement.number}
                </div>
                <div className="text-lg font-medium text-white/85">{achievement.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 space-y-6 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-3">
            <BookOpen className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
            <h3 className="font-heading text-3xl font-bold text-foreground">
              Comenzá tu futuro técnico hoy
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Unite a nuestra comunidad educativa y formá parte de la próxima generación
              de técnicos especializados.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="btn-glow bg-gradient-primary px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:opacity-90 hover:shadow-xl"
            >
              <Link to="/contacto">Solicitar Información</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary px-8 py-3 font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/tour-virtual">Conocer Campus</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
