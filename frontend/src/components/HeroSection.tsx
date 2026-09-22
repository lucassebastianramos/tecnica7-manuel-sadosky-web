import { ArrowRight, Award, Users, BookOpen, Sparkles, CalendarDays, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BlurText from './ui/BlurText';
import Squares from './ui/Squares';

const stats = [
  { icon: Users, value: '500+', label: 'Estudiantes' },
  { icon: BookOpen, value: '2', label: 'Especialidades' },
  { icon: Award, value: '110+', label: 'Años de Excelencia' },
];

const HeroSection = () => {
  const handleScroll = () => {
    const section = document.getElementById('carreras');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 pt-24"
    >
      {/* Fondo interactivo de grilla */}
      <div className="absolute inset-0" aria-hidden="true">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={48}
          borderColor="rgba(148, 163, 184, 0.14)"
          hoverFillColor="rgba(59, 130, 246, 0.22)"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-slate-950/20"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-cyan-300 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              E.E.S.T. N°7 &ldquo;Manuel Sadosky&rdquo; — Banfield
            </motion.div>

            <div className="space-y-4">
              <h1 id="hero-title" className="font-heading text-5xl font-bold leading-tight lg:text-7xl">
                <BlurText
                  text="Formando Técnicos del Futuro"
                  delay={120}
                  animateBy="words"
                  direction="top"
                  className="block"
                />
                <motion.span
                  className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                >
                  en Programación y Multimedios
                </motion.span>
              </h1>
              <motion.p
                className="max-w-xl text-xl font-medium leading-relaxed text-white/80 lg:text-2xl"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6, ease: 'easeOut' }}
              >
                Educación técnica pública de excelencia. Más de 110 años preparando
                profesionales con las competencias que demanda el mundo laboral actual.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.75, ease: 'easeOut' }}
            >
              <Button
                size="lg"
                className="btn-glow bg-gradient-primary px-8 py-6 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:opacity-90 hover:shadow-2xl"
                onClick={handleScroll}
              >
                Conocé Nuestras Carreras
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
              <Button
                asChild
                size="lg"
                className="border-2 border-white/30 bg-white/10 px-8 py-6 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/25 hover:text-white"
              >
                <Link to="/tour-virtual">Tour Virtual</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="space-y-2 text-center"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <stat.icon className="mx-auto h-8 w-8 text-cyan-400" aria-hidden="true" />
                  <div className="font-heading text-2xl font-bold lg:text-3xl">{stat.value}</div>
                  <div className="text-sm text-white/70 lg:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Featured Card */}
          <motion.div
            className="hidden justify-center lg:flex"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.9, ease: 'easeOut' }}
          >
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
              <div className="space-y-3 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg">
                  <GraduationCap className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-xl font-bold text-white">Inscripciones {new Date().getFullYear() + 1}</h2>
                <p className="text-white/80">
                  Iniciá tu futuro profesional en la escuela técnica líder de la zona sur para el ciclo {new Date().getFullYear() + 1}.
                </p>
              </div>

              <ul className="space-y-3 text-sm text-white/85">
                <li className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                    Ciclo Lectivo
                  </span>
                  <span className="font-semibold">{new Date().getFullYear() + 1}</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                    Inicio de clases
                  </span>
                  <span className="font-semibold">Marzo {new Date().getFullYear() + 1}</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                    Modalidad
                  </span>
                  <span className="font-semibold">Presencial</span>
                </li>
              </ul>

              <Button
                asChild
                className="w-full rounded-xl bg-accent py-3 font-bold text-white shadow-lg transition-all duration-300 hover:bg-accent-light hover:shadow-xl"
              >
                <Link to="/inscripcion">Inscribite para {new Date().getFullYear() + 1}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.button
        type="button"
        onClick={handleScroll}
        aria-label="Bajar a la sección de carreras"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/60 transition-colors hover:text-white md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        <motion.span
          className="block h-10 w-6 rounded-full border-2 border-current p-1"
          aria-hidden="true"
        >
          <motion.span
            className="block h-2 w-2 rounded-full bg-current"
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
        </motion.span>
      </motion.button>
    </section>
  );
};

export default HeroSection;
