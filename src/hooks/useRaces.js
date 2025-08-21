import { useState, useEffect } from 'react';
import { getSelectRaces, getRaces, postRaces, putRaces, deleteRaces } from '../services/racesService'

const mockRazas = {
  1: [
    { id: 1, nombre: 'Max', raza: 'Labrador', edad: 5 },
    { id: 2, nombre: 'Toby', raza: 'Poodle', edad: 3 },
  ],
  2: [
    { id: 3, nombre: 'Luna', raza: 'Bulldog', edad: 2 },
  ],
  3: [],
};


export const useRaces = () => {
  const [razas, setRazas] = useState([]);
  const [selectRazas, setSelectRazas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalRazasVisible, setModalRazasVisible] = useState(false);
    const [modalTipo, setModalTipo] = useState(''); // 'agregar' | 'editar' | 'eliminar'
    const [razaActual, setRazaActual] = useState();
    useEffect(() => {
      async function fetchData() {
        const races = await getRaces();
        setRazas(races.data);
      }
      fetchData();
      }, []);

    const abrirModal = (tipo, raza = null) => {
      setModalTipo(tipo);
      setRazaActual(raza);
      setModalVisible(true);
    };

    const abrirModalRazas = (raza) => {
      setRazaActual(raza);
      setModalRazasVisible(true);
    };

    const cerrarModal = () => {
      setModalVisible(false);
      setRazaActual(null);
      setModalTipo('');
    };

  const cerrarModalRazas = () => {
    setModalRazasVisible(false);
    setRazaActual(null);
  };

  const handleSubmit = async (e) => {
    // falta validaciones
    console.log(razaActual);
    e.preventDefault();
    const nuevoDueno = {
      // id: razaActual?.id || Date.now(),
      nombreCompleto: razaActual.nombreCompleto,
      tipoIdentificacion: razaActual.tipoIdentificacion,
      numeroIdentificacion: razaActual.numeroIdentificacion,
      direccion: razaActual.direccion,
      telefono: razaActual.telefono,
      email: razaActual.email,
      estado: "Activo"
    };
    if (modalTipo === 'editar') {
      console.log(nuevoDueno);
      nuevoDueno.razaId = razaActual.razaId
      const data = await putRaces(nuevoDueno);
      if (data.success) setRazas(prev => prev.map(d => d.razaId  === nuevoDueno.razaId  ? nuevoDueno : d));

    } else {
      const data = await postRaces(nuevoDueno);
      if (data.success) setRazas(prev => [...prev, nuevoDueno]);
    }
    cerrarModal();
  };

  const handleEliminarConfirmado = async () => {
    const data = await deleteRaces(razaActual.razaId);
    if (data) setRazas(prev => prev.filter(d => d.razaId !== razaActual.razaId));
    cerrarModal();
  }; 
  
  // Para traer los datos para un select 
  const selectRace = async () => {
    const data = await getSelectRaces();
    console.log(data);
    if (data) {
      setSelectRazas(data.data);
      return data.data;
    }
    return []
  }; 
  
  return {
    razas, modalVisible, modalRazasVisible, modalTipo, razaActual,
    setRazaActual, abrirModal, abrirModalRazas, cerrarModal, cerrarModalRazas, 
    handleSubmit, handleEliminarConfirmado, 
    mockRazas,
    selectRace, selectRazas
  };
};
