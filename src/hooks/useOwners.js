import { useState, useEffect } from 'react';
import { getSelectOwners, getOwners, postOwners, putOwners, deleteOwners } from '../services/ownersService'
import { getOwnerPets } from '../services/petsService'

export const useOwners = () => {
  const [duenos, setDuenos] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [selectDuenos, setSelectDuenos] = useState([]);
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

  const abrirModalMascotas = async (dueno) => {
    setDuenoActual(dueno);
    const pets = await getOwnerPets(dueno.duenoId);
    setMascotas(pets.data)
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
    e.preventDefault();
    const nuevoDueno = {
      nombreCompleto: duenoActual.nombreCompleto,
      tipoIdentificacion: duenoActual.tipoIdentificacion,
      numeroIdentificacion: duenoActual.numeroIdentificacion,
      direccion: duenoActual.direccion,
      telefono: duenoActual.telefono,
      email: duenoActual.email,
      estado: "Activo"
    };
    if (modalTipo === 'editar') {
      nuevoDueno.duenoId = duenoActual.duenoId
      const data = await putOwners(nuevoDueno);
      if (data.success) setDuenos(prev => prev.map(d => d.duenoId === nuevoDueno.duenoId ? nuevoDueno : d));

    } else {
      const data = await postOwners(nuevoDueno);
      if (data.success) setDuenos(prev => [...prev, nuevoDueno]);
    }
    cerrarModal();
  };

  const handleEliminarConfirmado = async () => {
    const data = await deleteOwners(duenoActual.duenoId);
    if (data) setDuenos(prev => prev.filter(d => d.duenoId !== duenoActual.duenoId));
    cerrarModal();
  };

  // Para traer los datos para un select 
  const selectOwner = async () => {
    const data = await getSelectOwners();
    if (data.success) {
      setSelectDuenos(data.data);
      return data.data;
    }
    return []
  };

  return {
    duenos, modalVisible, modalMascotasVisible, modalTipo, duenoActual,
    setDuenoActual, abrirModal, abrirModalMascotas, cerrarModal, cerrarModalMascotas,
    handleSubmit, handleEliminarConfirmado,
    mascotas,
    selectOwner, selectDuenos
  };
};
