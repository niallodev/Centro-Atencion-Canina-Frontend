import { useState } from 'react';
import { getSelectCategories } from '../services/categoriesServices'

export const useCategories = () => {
  const [selectCategorias, setSelectCategories] = useState([]);
  // Para traer los datos para un select 
  const selectCategory = async () => {
    const data = await getSelectCategories();
    if (data) {
      setSelectCategories(data.data);
      return data.data;
    }
    return []
  };

  return {
    selectCategory, selectCategorias
  };
};
