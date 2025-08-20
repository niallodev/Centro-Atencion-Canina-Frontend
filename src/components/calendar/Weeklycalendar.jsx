import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { es } from 'date-fns/locale';
import './Calendar.css'

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // semana inicia lunes
  getDay,
  locales,
});

const eventosEjemplo = [
  {
    title: 'Cita con Max',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  },
  {
    title: 'Vacunación de Luna',
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
];

export default function Weeklycalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
     const handleNavigate = (date) => {
    setCurrentDate(date);
  };

  return (
    <div className="calendar-scroll-wrapper">
        {/* <div style={{ height: 500, marginTop: '2rem' }}> */}
        <div className="calendar-inner" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <Calendar
            localizer={localizer}
            events={eventosEjemplo}
            date={currentDate}
            onNavigate={handleNavigate}
            defaultView="week"
            views={['week']}
            startAccessor="start"
            endAccessor="end"
            culture="es"
            messages={{
            week: 'Semana',
            day: 'Día',
            month: 'Mes',
            today: 'Hoy',
            previous: 'Anterior',
            next: 'Siguiente',
            }}
        />
        </div>
    </div>
  );
}
