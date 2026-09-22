import { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  ArrowDown,
  ArrowUp,
  ExternalLink,
  FileText,
  Clock,
  Search,
  Filter,
  School,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { calendarData } from "@/lib/calendarData";
import CalendarMonth from "@/components/CalendarMonth";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CalendarioAcademico = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "holiday" | "event" | "recess">("all");

  const currentYear = new Date().getFullYear();

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
    setIsAtBottom(bottom);
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filtered calendar data based on search and type filter
  const filteredCalendarData = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return calendarData
      .map((monthData) => {
        const filteredEvents = monthData.events.filter((evt) => {
          const matchesType = activeFilter === "all" || evt.type === activeFilter;
          const matchesSearch =
            !term ||
            evt.description.toLowerCase().includes(term) ||
            evt.day.toLowerCase().includes(term) ||
            monthData.month.toLowerCase().includes(term);
          return matchesType && matchesSearch;
        });
        return {
          month: monthData.month,
          events: filteredEvents,
        };
      })
      .filter((monthData) => monthData.events.length > 0);
  }, [searchTerm, activeFilter]);

  // Official ABC Annexes list
  const anexosABC = [
    {
      id: "anexo-i",
      title: "Anexo I",
      subtitle: "Pautas y Criterios Generales",
      description: "Disposiciones reglamentarias, meta de 190 días de clases y lineamientos para todas las escuelas bonaerenses.",
      url: "https://abc.gob.ar/calendario_escolar/anexo-i",
      tag: "Normativa General",
    },
    {
      id: "anexo-ii",
      title: "Anexo II",
      subtitle: "Secundaria y Educación Técnica",
      description: "Cronograma oficial para escuelas técnicas y secundarias: inicio 02/03, receso invernal (20 al 31 de Julio) y cierre de ciclo.",
      url: "https://abc.gob.ar/calendario_escolar/anexo-ii",
      tag: "Técnica y Secundaria",
      highlight: true,
    },
    {
      id: "anexo-iii",
      title: "Anexo III",
      subtitle: "Educación Superior",
      description: "Pautas y cronograma del ciclo lectivo para institutos de formación docente y formación técnica superior.",
      url: "https://abc.gob.ar/calendario_escolar/anexo-iii",
      tag: "Superior",
    },
    {
      id: "anexo-iv",
      title: "Anexo IV",
      subtitle: "Efemérides y Conmemoraciones",
      description: "Jornadas institucionales, actos escolares, celebraciones pedagógicas y conmemoraciones cívico-patrióticas.",
      url: "https://abc.gob.ar/calendario_escolar/anexo-iv",
      tag: "Efemérides",
    },
    {
      id: "anexo-v",
      title: "Anexo V",
      subtitle: "Actividades Docentes y Administrativas",
      description: "Períodos de comisiones evaluadoras, intensificación pedagógica, licencias y organización del personal.",
      url: "https://abc.gob.ar/calendario_escolar/anexo-v",
      tag: "Docentes y Gestión",
    },
  ];

  // Key milestones for EEST N°7
  const hitosInstitucionales = [
    {
      date: "Febrero",
      title: "Planificación y Revinculación Diagnóstica",
      description: "Comienzo de las actividades de organización institucional, reuniones de departamento y diagnóstico en talleres y laboratorios.",
      badge: "Docentes y Alumnos",
      color: "border-blue-500 bg-blue-50/50",
    },
    {
      date: "02 de Marzo",
      title: "Inicio del Ciclo Lectivo Oficial",
      description: "Comienzo formal de clases para todos los años del Nivel Secundario Técnico. Apertura de ciclo teórico y de talleres.",
      badge: "Oficial PBA",
      color: "border-emerald-500 bg-emerald-50/50",
    },
    {
      date: "Mayo / Junio",
      title: "1° Período de Valoración RITE",
      description: "Registro Institucional de Trayectorias Educativas. Primera entrega formal de informes y devoluciones pedagógicas a las familias.",
      badge: "Evaluación Continua",
      color: "border-indigo-500 bg-indigo-50/50",
    },
    {
      date: "20 al 31 de Julio",
      title: "Receso Escolar de Invierno",
      description: "Suspensión reglamentaria de actividades escolares áulicas en toda la Provincia de Buenos Aires (DGCyE Anexo II).",
      badge: "Receso Escolar",
      color: "border-amber-500 bg-amber-50/50",
    },
    {
      date: "15 de Noviembre",
      title: "Día de la Educación Técnica y Muestra Anual",
      description: "Exposición comunitaria de proyectos tecnológicos, desarrollos de software, circuitos electrónicos y prácticas electromecánicas.",
      badge: "Especialidad Técnica",
      color: "border-cyan-500 bg-cyan-50/50",
    },
    {
      date: "Diciembre (hasta 22/12)",
      title: "Intensificación y Cierre del Ciclo Lectivo",
      description: "Períodos de intensificación y acreditación de aprendizajes pendientes, cierre de RITE y acto de colación de egresados técnicos.",
      badge: "Cierre de Ciclo",
      color: "border-rose-500 bg-rose-50/50",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-foreground">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        {/* Header Hero */}
        <motion.div
          className="text-center space-y-5 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold mb-2">
            <School className="w-4 h-4" />
            <span>Ciclo Lectivo Oficial {currentYear} — DGCyE Provincia de Buenos Aires</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Calendario Escolar y <span className="text-primary">Académico {currentYear}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Fechas clave, efemérides e hitos pedagógicos de la{" "}
            <strong className="text-slate-900">E.E.S.T. N°7 &ldquo;Manuel Sadosky&rdquo;</strong>, sincronizados con la
            normativa de la Dirección General de Cultura y Educación (DGCyE).
          </p>
        </motion.div>

        {/* Portal ABC Integration Hub */}
        <motion.div
          className="mt-12 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-md relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

          {/* Banner Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-primary text-white hover:bg-primary/90">
                  Portal ABC Oficial
                </Badge>
                <span className="text-xs text-slate-500 font-medium">Gobierno de la Pcia. de Buenos Aires</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
                Calendario Oficial DGCyE {currentYear} en Portal ABC
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                El calendario escolar provincial es actualizado continuamente por el Consejo General de Cultura y
                Educación. Podés consultar y descargar los anexos y normativas directamente desde el portal oficial.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-md shrink-0 flex items-center gap-2"
            >
              <a href="https://abc.gob.ar/calendario_escolar/" target="_blank" rel="noopener noreferrer">
                <span>Acceder a Portal ABC</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>

          {/* Anexos Cards */}
          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Anexos Oficiales del Calendario Escolar (Resolución DGCyE)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {anexosABC.map((anexo) => (
                <a
                  key={anexo.id}
                  href={anexo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                    anexo.highlight
                      ? "border-primary/40 bg-blue-50/40 hover:bg-blue-50/70"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/60"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-lg text-slate-900 group-hover:text-primary transition-colors flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-primary" />
                        {anexo.title}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                        {anexo.tag}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-800">{anexo.subtitle}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{anexo.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-primary group-hover:underline">
                    <span>Ver documento en Portal ABC</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Institutional Milestones Section */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <Badge variant="outline" className="text-primary border-primary/30">
              Trayectoria y Organización Escolar
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
              Hitos Clave del Ciclo Lectivo en la Técnica N°7
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Las etapas pedagógicas fundamentales para los estudiantes, familias y equipo docente de nuestra institución.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hitosInstitucionales.map((hito, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl border-2 shadow-xs transition-shadow hover:shadow-md flex flex-col justify-between ${hito.color}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold px-3 py-1 rounded-lg bg-white shadow-xs text-slate-900 border border-slate-200/70">
                      {hito.date}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/80 border text-slate-700">
                      {hito.badge}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 leading-snug">{hito.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{hito.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>E.E.S.T. N°7 &ldquo;Manuel Sadosky&rdquo;</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Monthly Calendar Section with Search & Filter */}
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 pb-6 border-b border-slate-200">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900">
                Calendario Escolar Detallado y Efemérides
              </h2>
              <p className="text-sm text-slate-600">
                Feriados nacionales (Ley 27.399), jornadas de convivencia y conmemoraciones pedagógicas de la PBA.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === "all"
                    ? "bg-primary text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setActiveFilter("holiday")}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === "holiday"
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Feriados
              </button>
              <button
                onClick={() => setActiveFilter("event")}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === "event"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Efemérides / Eventos
              </button>
              <button
                onClick={() => setActiveFilter("recess")}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === "recess"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Recesos
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="mb-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar fecha o efeméride (ej: Malvinas, Vacaciones, Carnaval)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>

          {/* Monthly Items */}
          {filteredCalendarData.length > 0 ? (
            <div className="space-y-4">
              {filteredCalendarData.map((monthData, index) => (
                <CalendarMonth
                  key={index}
                  month={monthData.month}
                  events={monthData.events}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white border border-slate-200 space-y-3">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-heading font-semibold text-lg text-slate-800">No se encontraron fechas</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                No hay resultados para tu búsqueda con los filtros aplicados. Podés probar limpiando el buscador o
                seleccionando &ldquo;Todos&rdquo;.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
              >
                Restablecer filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Scroll Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={isAtBottom ? scrollToTop : scrollToBottom}
              className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 text-white"
              aria-label={isAtBottom ? "Ir arriba" : "Ir abajo"}
            >
              {isAtBottom ? <ArrowUp className="h-6 w-6" /> : <ArrowDown className="h-6 w-6" />}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarioAcademico;
