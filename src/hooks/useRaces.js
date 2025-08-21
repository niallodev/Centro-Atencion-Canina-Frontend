import { useState, useEffect } from 'react';
import { getSelectRaces, getRaces } from '../services/racesService'

export const useRaces = () => {
  const [razas, setRazas] = useState([]);
  const [selectRazas, setSelectRazas] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const races = await getRaces();
      setRazas(races.data);
    }
    fetchData();
  }, []);

  // Para traer los datos para un select 
  const selectRace = async () => {
    const data = await getSelectRaces();
    if (data) {
      setSelectRazas(data.data);
      return data.data;
    }
    return []
  };

  return {
    razas, selectRace, selectRazas
  };
};
