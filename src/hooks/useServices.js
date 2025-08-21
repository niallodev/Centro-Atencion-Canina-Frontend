import { useState, useEffect } from 'react';
import { getSelectServices, getServices } from '../services/servicesService'

export const useServices = () => {
    const [selectServicios, setSelectServicios] = useState([]);
    
    const [servicios, setServicios] = useState([]);
    
    useEffect(() => {
      async function fetchData() {
        const users = await getServices();
        setServicios(users.data);
      }
      fetchData();
      }, []);
    
    // Para traer los datos para un select 
    const selectService = async () => {
      const data = await getSelectServices();
      if (data.success) {
        setSelectServicios(data.data);
        return data.data;
      }
      return []
    }; 

  return {
    servicios,  selectService, selectServicios
  };
};
