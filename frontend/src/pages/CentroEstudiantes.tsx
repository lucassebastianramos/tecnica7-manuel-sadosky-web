import { ArrowUpRight, Calendar, Users, Vote, CheckCircle2, Clock, Sparkles } from "lucide-react";
import UnidosPorLaLibertad from "@/assets/UnidosPorLaLibertad.jpeg";
import CrearMasLibertad from "@/assets/Crear+Libertad.jpeg";
import AvanceEstudiantil from "@/assets/AvanceEstudiantil.jpg";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StudentCenterItem {
  period: string;
  name: string;
  president: string;
  image?: string;
  status: string;
  isUpcoming?: boolean;
  description?: string;
}

const CentroEstudiantes = () => {
  const studentCenters: StudentCenterItem[] = [
    {
      period: "2026-2027",
      name: "Próxima Lista / Gestión",
      president: "A definir (Próximas Elecciones)",
      status: "Próxima Convocatoria",
      isUpcoming: true,
      description: "Ciclo 2026-2027 en proceso de renovación de autoridades estudiantiles y conformación de listas.",
    },
    {
      period: "2025-2026",
      name: "Lápiz Negro",
      president: "Juan Ignacio Darias",
      status: "Mandato finalizado (2026)",
      description: "Gestión con mandato concluido en 2026.",
    },
    {
      period: "2024-2025",
      name: "Crear + Libertad",
      president: "Lucas Ramos",
      image: CrearMasLibertad,
      status: "Mandato cumplido",
    },
    {
      period: "2023-2024",
      name: "Unidos por la Libertad",
      president: "Lucas Ramos",
      image: UnidosPorLaLibertad,
      status: "Mandato cumplido",
    },
    {
      period: "2022-2023",
      name: "Avance Estudiantil",
      president: "Luz Roggerone",
      image: AvanceEstudiantil,
      status: "Mandato cumplido",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between sm:items-center mb-12"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter">
              Centro de <span className="text-primary">Estudiantes</span>
            </h1>
            <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
              Un recorrido por las gestiones estudiantiles.
            </p>
          </div>
          <Button asChild className="mt-4 sm:mt-0">
            <a
              href="http://centro.tecnica7ldz.edu.ar"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar Blog <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {studentCenters.map((center) => (
            <motion.div
              key={center.period}
              variants={itemVariants}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 shadow-xs hover:shadow-md ${
                center.isUpcoming
                  ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-300/80 dark:border-amber-700/50"
                  : "bg-card border-border/80"
              }`}
            >
              <div className="grid md:grid-cols-3">
                <div className="md:col-span-1 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="font-mono text-sm font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {center.period}
                      </span>
                      {center.isUpcoming ? (
                        <Badge className="bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-400/40 text-xs font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          Próxima Lista
                        </Badge>
                      ) : center.period === "2025-2026" ? (
                        <Badge variant="outline" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700 text-xs font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          Mandato finalizado en 2026
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground text-xs font-normal flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          Mandato cumplido
                        </Badge>
                      )}
                    </div>

                    <h2 className="text-2xl font-heading font-bold text-foreground">
                      {center.name}
                    </h2>

                    <div className="mt-4 space-y-3">
                      <div className="flex items-start">
                        <Users className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground shrink-0" />
                        <div>
                          <span className="font-medium text-foreground">{center.president}</span>
                          <p className="text-xs text-muted-foreground">
                            {center.isUpcoming ? "Representación estudiantil" : "Presidencia del Centro"}
                          </p>
                        </div>
                      </div>

                      {center.description && (
                        <p className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                          {center.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-muted/40 dark:bg-muted/20 min-h-[220px] md:min-h-[260px] flex items-center justify-center p-6 border-t md:border-t-0 md:border-l border-border/60">
                  {center.image ? (
                    <img
                      src={center.image}
                      alt={`Imagen de ${center.name}`}
                      className="max-w-full max-h-[280px] object-contain rounded-xl shadow-xs"
                    />
                  ) : center.isUpcoming ? (
                    <div className="text-center p-6 max-w-md space-y-3">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <Vote className="w-7 h-7" />
                      </div>
                      <h3 className="font-heading font-bold text-base text-foreground">
                        Convocatoria y Renovación 2026-2027
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Espacio abierto para la próxima lista y conducción estudiantil electa por las y los estudiantes de la Escuela Técnica N°7.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center p-6 max-w-md space-y-3">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                        <Users className="w-7 h-7" />
                      </div>
                      <h3 className="font-heading font-semibold text-base text-foreground">
                        Lista Lápiz Negro
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Gestión estudiantil de Juan Ignacio Darias. Mandato culminado en el ciclo 2026.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default CentroEstudiantes;
