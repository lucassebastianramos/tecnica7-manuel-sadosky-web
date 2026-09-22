import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Files, CalendarDays, Phone, ThumbsUp, Users, Clock } from 'lucide-react';

const sidebarItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Inscripción", href: "#inscripcion" },
  { label: "Documentos", href: "#documentacion" },
  { label: "Fechas", href: "#fechas" },
  { label: "Contacto", href: "#contacto" },
  { label: "Vacantes", href: "#vacantes" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut" as const
    }
  }
};

const InscripcionPage = () => {
  const currentYear = new Date().getFullYear();
  // Las inscripciones siempre corresponden al próximo ciclo lectivo
  const enrollmentYear = currentYear + 1;

  const cardData = useMemo(() => [
    {
      id: "inscripcion",
      icon: FileText,
      title: "Planilla de inscripción",
      content: `Descargar la planilla oficial de inscripción de Nivel Secundario de la Provincia de Buenos Aires (DGCyE / ABC), completar de forma legible y firmar para el ciclo lectivo ${enrollmentYear}.`,
      action: {
        href: "https://abc.gob.ar/secretarias/sites/default/files/2023-08/Secundaria%20-%20Planilla%20de%20inscripci%C3%B3n.pdf",
        text: "3- PLANILLA INSCRIPCION 2022 -SECUNDARIA - 12-9",
      }
    },
    {
      id: "documentacion",
      icon: Files,
      title: "Documentación requerida",
      content: `Documentación obligatoria para presentar con la planilla para el ciclo lectivo ${enrollmentYear}:`,
      list: [
        "DNI del alumno (Original y Fotocopia).",
        "Constancia de CUIL del alumno.",
        "Partida de nacimiento del alumno (Original y Fotocopia).",
        "Certificado de vacunas obligatorias (Original y Fotocopia).",
        "Título de Primaria o Constancia de finalización de 6° Grado (Original y Fotocopia).",
        "Certificado de ANALÍTICO INCOMPLETO EN TRÁMITE (Para ingresantes a 2°, 3° o 4° AÑO).",
        "DNI del Padre/Madre o Tutor (Original y Fotocopia).",
        "Dos folios tamaño oficio."
      ]
    },
    {
      id: "fechas",
      icon: CalendarDays,
      title: "Fechas importantes",
      content: `Cronograma oficial de inscripción para el ciclo ${enrollmentYear}:`,
      list: [
        `Inscripción presencial general: 10 al 20 de noviembre de ${currentYear}.`,
        `Período de remanentes y complementaria: febrero / marzo de ${enrollmentYear}.`,
        "Horario de atención: 8:30 a 12:00 y 13:30 a 16:00 hs.",
        "Consultas y recepción: Secretaría escolar (Manuel Acevedo 1864, Banfield)."
      ]
    },
    {
      id: "contacto",
      icon: Phone,
      title: "Contacto y consultas",
      content: "¿Dudas o consultas sobre tu trámite? Comunicate con la Secretaría institucional:",
      list: [
        "Teléfonos: (011) 4248-6259 / 11 6523-3593",
        "Emails oficiales: tecnica7lomasdezamora@abc.gob.ar / eet7lz@yahoo.com.ar",
        "Dirección: Manuel Acevedo 1864, Banfield (Provincia de Buenos Aires, a 4 cuadras de la estación)"
      ]
    },
    {
      id: "recomendaciones",
      icon: ThumbsUp,
      title: "Recomendaciones",
      content: `Recomendaciones para el ingreso al ciclo lectivo ${enrollmentYear}:`,
      list: [
        "Verificá que toda la documentación esté completa y legible antes de concurrir.",
        "Presentá siempre original y fotocopia de cada certificado para su cotejo.",
        `Consultá por vacantes y requisitos específicos según el año de ingreso técnico (${enrollmentYear}).`
      ]
    },
    {
      id: "vacantes",
      icon: Users,
      title: "Vacantes y cupos",
      content: "Las vacantes se asignan según el orden reglamentario de la DGCyE y cumplimiento de requisitos. En caso de no obtener vacante directa, podés solicitar inscripción en la lista de espera oficial."
    },
    {
      id: "turnos",
      icon: Clock,
      title: "Turnos y horarios",
      content: "Turnos de funcionamiento técnico:",
      list: [
        "Turno mañana: 7:30 a 12:00 hs.",
        "Turno tarde: 13:00 a 17:30 hs.",
        "Talleres y contraturnos: según división y especialidad."
      ]
    }
  ], [currentYear, enrollmentYear]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4 sticky top-28 h-fit bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Navegación</h2>
            <nav>
              <ul className="space-y-3">
                {sidebarItems.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="block text-gray-600 hover:text-primary font-medium transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <section id="inicio" className="lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-16 text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Inscripciones <span className="text-primary">{enrollmentYear}</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Inscribite y comenzá tu camino técnico en la E.E.S.T N°7 para el ciclo lectivo {enrollmentYear}.
                Encontrá toda la información y documentación que necesitás para completar tu ingreso.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cardData.map((card) => (
                <motion.div
                  key={card.id}
                  id={card.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <card.icon className="w-6 h-6 mr-3 text-primary" />
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow">{card.content}</p>
                  {card.list && (
                    <ul className="list-disc pl-6 text-left text-gray-600 space-y-2 mb-4 flex-grow">
                      {card.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {card.action && (
                    <div className="mt-auto pt-4">
                      <a
                        href={card.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-lg px-6 py-2.5 font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-sm"
                      >
                        <FileText className="w-4 h-4" />
                        {card.action.text}
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default InscripcionPage;