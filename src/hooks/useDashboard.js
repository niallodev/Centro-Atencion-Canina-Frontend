import { useState, useEffect } from 'react';
import {getPet } from '../services/petService';
import {getAppointment } from '../services/appointmentService';

export const useDashboard = () => {
  const [cantidadMascotas, setCantidadMascotas] = useState(0);
  const [citas, setCitas] = useState({
    pendientes: 0,
    realizadas: 0,
    canceladas: 0
  });

    
  useEffect(() => {
      async function fetchData() {
        const totalMascotas = await getPet();
        const citas = await getAppointment();
        setCantidadMascotas(totalMascotas.data);
        setCitas(citas.data);
      }
  
      fetchData();
    }, []);
  return {
    cantidadMascotas, citas
  };
};
