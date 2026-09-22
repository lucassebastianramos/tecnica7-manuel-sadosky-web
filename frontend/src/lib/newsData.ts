import patioColegio from '@/assets/patioColegio.jpg';
import fotoalumnos from '@/assets/fotoalumnos.webp';
import teatromalvinas from '@/assets/teatromalvinas.jpeg';
import multimedios from '@/assets/multimedios.png';
import programacion from '@/assets/programacion.png';
import escuela from '@/assets/escuela.jpeg';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'Especialidades' | 'Institucional' | 'Comunidad' | 'Innovación';
  date: string;
  image: string;
  instagramUrl: string;
  internalUrl?: string;
  featured?: boolean;
}

export const schoolNewsData: NewsItem[] = [
  {
    id: 'expo-tecnica',
    title: 'Muestra Anual y Expo Técnica: Innovación y Proyectos Estudiantiles',
    summary: 'Los estudiantes de ciclo superior presentaron sus proyectos integradores: sistemas de software, robótica industrial, circuitos y producciones audiovisuales ante toda la comunidad.',
    category: 'Especialidades',
    date: 'Reciente',
    image: patioColegio,
    instagramUrl: 'https://www.instagram.com/tecnica7banfield/',
    featured: true,
  },
  {
    id: 'inscripciones-ciclo',
    title: `Inscripciones y Matriculación: Sumate a la Técnica N°7`,
    summary: 'Se encuentra disponible la planilla oficial de inscripción de la DGCyE. Conocé los requisitos, documentación y vacantes para ciclo básico y especialidades superiores.',
    category: 'Institucional',
    date: 'Convocatoria Abierta',
    image: fotoalumnos,
    instagramUrl: 'https://www.instagram.com/tecnica7banfield/',
    internalUrl: '/inscripcion',
    featured: true,
  },
  {
    id: 'radio-multimedios',
    title: 'Radio Escolar en Vivo: Prácticas de Comunicación Audiovisual',
    summary: 'Los alumnos de la especialidad en Multimedios llevaron adelante transmisiones en directo cubriendo la actualidad escolar, entrevistas a docentes y eventos institucionales.',
    category: 'Especialidades',
    date: 'Actividad en Taller',
    image: multimedios,
    instagramUrl: 'https://www.instagram.com/tecnica7banfield/',
    internalUrl: '/radio',
  },
  {
    id: 'jornadas-malvinas',
    title: 'Jornada por la Memoria y Homenaje a los Héroes de Malvinas',
    summary: 'Encuentro concurrido con veteranos de Lomas de Zamora, muestras temáticas realizadas por los cursos y momentos de reflexión comunitaria en nuestro patio.',
    category: 'Comunidad',
    date: 'Acto Escolar',
    image: teatromalvinas,
    instagramUrl: 'https://www.instagram.com/tecnica7banfield/',
  },
  {
    id: 'nuevos-laboratorios',
    title: 'Mejoras y Equipamiento en Laboratorios de Informática y Taller',
    summary: 'Se sumaron nuevos recursos y estaciones de trabajo para prácticas de desarrollo de software, mantenimiento de hardware y herramientas para el ciclo básico.',
    category: 'Innovación',
    date: 'Gestión Institucional',
    image: escuela,
    instagramUrl: 'https://www.instagram.com/tecnica7banfield/',
  },
  {
    id: 'torneos-programacion',
    title: 'Participación en Certámenes y Olimpíadas Provinciales',
    summary: 'Alumnos de la orientación de Programación representaron a la escuela en competencias de algoritmia y resolución de problemas técnicos a nivel distrital.',
    category: 'Especialidades',
    date: 'Certámenes Estudiantiles',
    image: programacion,
    instagramUrl: 'https://www.instagram.com/tecnica7banfield/',
    internalUrl: '/programacion',
  },
];
