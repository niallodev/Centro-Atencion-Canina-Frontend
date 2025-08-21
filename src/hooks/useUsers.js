import { useState, useEffect } from 'react';
import { getSelectUsers, getUsers } from '../services/usersService'

export const useUsers = () => {
  const [selectUsuarios, setSelectUsuarios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const users = await getUsers();
      setUsuarios(users.data);
    }
    fetchData();
  }, []);

  // Para traer los datos para un select 
  const selectUser = async () => {
    const data = await getSelectUsers();
    if (data.success) {
      setSelectUsuarios(data.data);
      return data.data;
    }
    return []
  };


  return {
    usuarios, selectUser, selectUsuarios,
  };
};
