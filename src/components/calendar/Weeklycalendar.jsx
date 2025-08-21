import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { es } from 'date-fns/locale';
import { ButtonField } from '../components'
import './Calendar.css'
const locales = { es: es, };
const localizer = dateFnsLocalizer({
  format, parse, getDay, locales,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // semana inicia lunes
});

export default function Weeklycalendar({ citasProgramadas }) {
  const [eventos, setEventos] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  useEffect(() => {
    if (!Array.isArray(citasProgramadas)) return;

    const eventos = citasProgramadas.map(cita => {
      const inicio = new Date(cita.fechaHora);
      const fin = new Date(inicio.getTime() + 60 * 60000); // 1 hora

      return {
        title: `${cita.nombreMascota} - ${cita.nombreServicio}`,
        start: inicio, end: fin,
        original: cita
      };
    });
    setEventos(eventos);
  }, [citasProgramadas]);

  const handleNavigate = date => {setCurrentDate(date);};

  const handleSelectEvent = evento => {
    setCitaSeleccionada(evento.original);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCitaSeleccionada(null);
  };

  const CustomEvent = ({ event }) => {
    return (
      <div className="custom-event">
        <strong>{event.original.nombreMascota}</strong>
        <div className="custom-event-service">{event.original.nombreServicio}</div>
      </div>
    );
  };

  return (
    <div className="calendar-scroll-wrapper">
      <div className="calendar-inner" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <Calendar
          localizer={localizer}
          events={eventos}
          date={currentDate}
          onNavigate={handleNavigate}
          defaultView="week"
          views={['week']}
          startAccessor="start"
          endAccessor="end"
          culture="es"
          onSelectEvent={handleSelectEvent}
          messages={{
            week: 'Semana', day: 'Día', month: 'Mes',
            today: 'Hoy', previous: 'Anterior', next: 'Siguiente',
          }}
          components={{ event: CustomEvent }}
        />
      </div>
      {modalVisible && citaSeleccionada && (
        <div className="calendar-modal-overlay" onClick={closeModal}>
          <div className="calendar-modal" onClick={e => e.stopPropagation()}>
            <h2>Detalles de la Cita</h2>
            <p><strong>Mascota:</strong> {citaSeleccionada.nombreMascota}</p>
            <p><strong>Servicio:</strong> {citaSeleccionada.nombreServicio}</p>
            <p><strong>Fecha y Hora:</strong> {new Date(citaSeleccionada.fechaHora).toLocaleString()}</p>
            <p><strong>Profesional:</strong> {citaSeleccionada.nombreProfesional ?? 'No asignado'}</p>
            <p><strong>Motivo:</strong> {citaSeleccionada.motivo ?? 'Sin motivo'}</p>
            <ButtonField type={'button'} form={true} onclick={closeModal} className="Agregar" text={'Cerrar'} />
          </div>
        </div>
      )}
    </div>
  );
}