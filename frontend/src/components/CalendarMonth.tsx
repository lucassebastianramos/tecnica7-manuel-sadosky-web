import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Coffee, Flag } from 'lucide-react';

export interface CalendarEvent {
  day: string;
  description: string;
  type: 'holiday' | 'event' | 'recess';
}

interface CalendarMonthProps {
  month: string;
  events: CalendarEvent[];
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({ month, events }) => {
  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'holiday':
        return {
          icon: <Flag className="h-5 w-5 text-red-600 shrink-0" />,
          label: 'Feriado',
          badgeClasses: 'bg-red-100 text-red-700 border-red-200',
          classes: 'bg-red-50/70 border-red-200/80 hover:bg-red-100/60',
          dayClasses: 'bg-red-100 text-red-800',
        };
      case 'event':
        return {
          icon: <Calendar className="h-5 w-5 text-blue-600 shrink-0" />,
          label: 'Efeméride / Acto',
          badgeClasses: 'bg-blue-100 text-blue-700 border-blue-200',
          classes: 'bg-blue-50/70 border-blue-200/80 hover:bg-blue-100/60',
          dayClasses: 'bg-blue-100 text-blue-800',
        };
      case 'recess':
        return {
          icon: <Coffee className="h-5 w-5 text-amber-600 shrink-0" />,
          label: 'Receso Escolar',
          badgeClasses: 'bg-amber-100 text-amber-800 border-amber-200',
          classes: 'bg-amber-50/80 border-amber-200 hover:bg-amber-100/70',
          dayClasses: 'bg-amber-100 text-amber-900',
        };
      default:
        return {
          icon: <Calendar className="h-5 w-5 text-slate-600 shrink-0" />,
          label: 'Actividad',
          badgeClasses: 'bg-slate-100 text-slate-700 border-slate-200',
          classes: 'bg-slate-50 border-slate-200 hover:bg-slate-100',
          dayClasses: 'bg-slate-100 text-slate-800',
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -15, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="mb-10 bg-card rounded-2xl p-5 sm:p-7 border border-border shadow-sm"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-primary inline-block"></span>
          {month}
        </h2>
        <span className="text-xs sm:text-sm font-medium text-muted-foreground">
          {events.length} {events.length === 1 ? 'fecha' : 'fechas'}
        </span>
      </div>

      <motion.div
        className="space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {events.map((event, index) => {
          const typeInfo = getTypeInfo(event.type);
          return (
            <motion.div
              key={index}
              className={`p-3.5 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors duration-200 ${typeInfo.classes}`}
              variants={itemVariants}
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="p-2 rounded-lg bg-white shadow-xs shrink-0">
                  {typeInfo.icon}
                </div>
                <div className={`px-2.5 py-1 rounded-md text-xs sm:text-sm font-bold shrink-0 min-w-[4rem] text-center ${typeInfo.dayClasses}`}>
                  Día {event.day}
                </div>
                <div className="text-slate-800 text-sm sm:text-base font-medium leading-snug break-words">
                  {event.description}
                </div>
              </div>
              <span className={`self-start sm:self-center text-xs px-2.5 py-0.5 rounded-full font-semibold border shrink-0 ${typeInfo.badgeClasses}`}>
                {typeInfo.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default CalendarMonth;
