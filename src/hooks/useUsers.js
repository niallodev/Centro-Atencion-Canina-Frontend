import { useState, useEffect } from 'react';
import { getSelectUsers, getUsers, postUsers, putUsers, deleteUsers } from '../services/usersService'

export const useUsers = () => {
    const [selectUsuarios, setSelectUsuarios] = useState([]);
    
    const [usuarios, setUsuarios] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTipo, setModalTipo] = useState(''); // 'agregar' | 'editar' | 'eliminar'
    const [usuarioActual, setUsuarioActual] = useState();
    
    useEffect(() => {
      async function fetchData() {
        const users = await getUsers();
        setUsuarios(users.data);
      }
      fetchData();
      }, []);

      
    const abrirModal = async (tipo, usuario = null) => { 
      setModalTipo(tipo);
      setCitaActual(usuario);
      setModalVisible(true);
    };

  

    const cerrarModal = () => {
      setModalVisible(false);
      setUsuarioActual(null);
      setModalTipo('');
    };


  const handleSubmit = async (e) => {
    // falta validaciones
    console.log(usuarioActual);
    e.preventDefault();
    const nuevoUsuario = {
      nombreCompleto: usuarioActual.nombreCompleto,
      nombreUsuario: usuarioActual.nombreUsuario,
      contrasenaHash: usuarioActual.contrasena,
      rol: usuarioActual.rol,
      estado: "Activo"
    };
    if (modalTipo === 'editar') {
      nuevoUsuario.usuarioId = usuarioActual.usuarioId
      const data = await putUsers(nuevoUsuario);
      if (data.success) setUsuarios(prev => prev.map(u => u.usuarioId  === nuevoUsuario.usuarioId  ? usuarioActual : u));

    } else {
      const data = await postUsers(nuevoUsuario);
      if (data.success) setUsuarios(prev => [...prev, nuevoUsuario]);
    }
    cerrarModal();
  };

  const handleEliminarConfirmado = async () => {
    const data = await deleteUsers(usuarioActual.usuarioId);
    if (data) setUsuarios(prev => prev.filter(u => u.usuarioId !== usuarioActual.usuarioId));
    cerrarModal();
  };  

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
    usuarios, modalVisible, modalTipo, usuarioActual, selectUser, selectUsuarios,
    setUsuarioActual, abrirModal, cerrarModal, handleSubmit, handleEliminarConfirmado
  };
};
