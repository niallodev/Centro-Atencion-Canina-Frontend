import { useState, useEffect } from 'react';
import { getPetSummary } from '../services/petsService';
import { getQuoteSummary } from '../services/quotesService';

export const useDashboard = () => {
  const [cantidadMascotas, setCantidadMascotas] = useState(0);
  const [citas, setCitas] = useState({
    pendientes: 0,
    realizadas: 0,
    canceladas: 0
  });

    
  useEffect(() => {
      async function fetchData() {
        const totalMascotas = await getPetSummary();
        const citas = await getQuoteSummary();
        setCantidadMascotas(totalMascotas.data);
        setCitas(citas.data);
      }
  
      fetchData();
    }, []);
  return {
    cantidadMascotas, citas
  };
};
