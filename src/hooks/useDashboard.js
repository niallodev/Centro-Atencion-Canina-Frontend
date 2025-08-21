import { useState, useEffect } from 'react';
import { getPetSummary } from '../services/petsService';
import { getQuoteSummary } from '../services/quotesService';
import { getQuotes } from '../services/quotesService'; 


export const useDashboard = () => {
  const [cantidadMascotas, setCantidadMascotas] = useState(0);
  const [citasProgramadas, setCitasProgramadas] = useState([]);
  const [citas, setCitas] = useState({
    pendientes: 0, realizadas: 0, canceladas: 0
  });

  useEffect(() => {
    async function fetchData() {
      const totalMascotas = await getPetSummary();
      const citas = await getQuoteSummary();
      const citasprogramadas = await getQuotes();
      setCantidadMascotas(totalMascotas.data);
      setCitas(citas.data);
      setCitasProgramadas(citasprogramadas.data);
    }

    fetchData();
  }, []);
  return {
    cantidadMascotas, citas, citasProgramadas
  };
};
