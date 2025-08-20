import { useState, useEffect } from 'react';
import { getOwners, postOwners, putOwners } from '../services/ownersService'

const mockMascotas = {
  1: [
    { id: 1, nombre: 'Max', raza: 'Labrador', edad: 5 },
    { id: 2, nombre: 'Toby', raza: 'Poodle', edad: 3 },
  ],
  2: [
    { id: 3, nombre: 'Luna', raza: 'Bulldog', edad: 2 },
  ],
  3: [],
};

export const useOwners = () => {
  const [duenos, setDuenos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMascotasVisible, setModalMascotasVisible] = useState(false);
    const [modalTipo, setModalTipo] = useState(''); // 'agregar' | 'editar' | 'eliminar'
    const [duenoActual, setDuenoActual] = useState();
    useEffect(() => {
      async function fetchData() {
        const owners = await getOwners();
        setDuenos(owners.data);
      }
      fetchData();
      }, []);

    const abrirModal = (tipo, dueno = null) => {
      setModalTipo(tipo);
      setDuenoActual(dueno);
      setModalVisible(true);
    };

    const abrirModalMascotas = (dueno) => {
      setDuenoActual(dueno);
      setModalMascotasVisible(true);
    };

    const cerrarModal = () => {
      setModalVisible(false);
      setDuenoActual(null);
      setModalTipo('');
    };

  const cerrarModalMascotas = () => {
    setModalMascotasVisible(false);
    setDuenoActual(null);
  };

  const handleSubmit = async (e) => {
    // falta validaciones
    console.log(duenoActual);
    e.preventDefault();
    const nuevoDueno = {
      // id: duenoActual?.id || Date.now(),
      nombreCompleto: duenoActual.nombreCompleto,
      tipoIdentificacion: duenoActual.tipoIdentificacion,
      numeroIdentificacion: duenoActual.numeroIdentificacion,
      direccion: duenoActual.direccion,
      telefono: duenoActual.telefono,
      email: duenoActual.email,
      estado: "Activo"
    };
    if (modalTipo === 'editar') {
      const data = await putOwners(nuevoDueno);
      if (data) setDuenos(prev => prev.map(d => d.id === nuevoDueno.id ? nuevoDueno : d));

    } else {
      console.log(nuevoDueno);
      const data = await postOwners(nuevoDueno);
      console.log(data);
      if (data.success) setDuenos(prev => [...prev, nuevoDueno]);
    }
    cerrarModal();
  };

  const handleEliminarConfirmado = async () => {
    const data = await deleteOwners(duenoActual.duenoId);
    if (data) setDuenos(prev => prev.filter(d => d.id !== duenoActual.id));
    cerrarModal();
  };  
  
  return {
    duenos, modalVisible, modalMascotasVisible, modalTipo, duenoActual,
    setDuenoActual, abrirModal, abrirModalMascotas, cerrarModal, cerrarModalMascotas, 
    handleSubmit, handleEliminarConfirmado,
    mockMascotas
  };
};
