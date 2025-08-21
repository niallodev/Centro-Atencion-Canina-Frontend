import { useState, useEffect } from 'react';
import { getPets, postPets, putPets, deletePets, getSelectPets } from '../services/petsService'
import { useOwners, useRaces, useCategories } from './hooks'

export const usePets = () => {
  const { selectDuenos, selectOwner } = useOwners();
  const { selectCategorias, selectCategory } = useCategories();
  const { selectRazas, selectRace } = useRaces();

  const [selectMascotas, setSelectMascotas] = useState([]);
  
  const [filtro, setFiltro] = useState('');
  const [razasFiltradas, setRazasFiltradas] = useState([]);
  const [mascotas, setMacotas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo, setModalTipo] = useState(''); // 'agregar' | 'editar' | 'eliminar'
  const [mascotaActual, setMascotaActual] = useState();

  useEffect(() => {
    async function fetchData() {
      const pets = await getPets();
      setMacotas(pets.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (mascotaActual?.categoriaId) {
      const filtradas = selectRazas.filter(raza => raza.categoriaId === Number(mascotaActual.categoriaId));
      setRazasFiltradas(filtradas);
    } else { setRazasFiltradas(selectRazas); }
  }, [mascotaActual?.categoriaId, selectRazas]);

  const abrirModal = async (tipo, mascota = null) => {
    let duenos, razas;
    if (tipo != 'elimiar') {
      duenos = await selectOwner();
      await selectCategory();
      razas = await selectRace();
    }
    if (tipo === 'editar') {
      const razaSeleccionada = razas.find(raza => raza.nombreRaza === mascota.nombreRaza);
      const duenoSeleccionado = duenos.find(dueno => dueno.nombreCompleto == mascota.nombreDueno)
      mascota.duenoId = duenoSeleccionado.duenoId
      mascota.categoriaId = razaSeleccionada.categoriaId
      mascota.razaId = razaSeleccionada.razaId
    }
    setModalTipo(tipo);
    setMascotaActual(mascota);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setMascotaActual(null);
    setModalTipo('');
  };

  const handleSubmit = async (e) => {
    //! falta validaciones
    e.preventDefault();
    const nuevaMascota = {
      duenoId: mascotaActual.duenoId,
      nombreMascota: mascotaActual.nombreMascota,
      especie: mascotaActual.especie,
      razaId: mascotaActual.razaId,
      fechaNacimiento: mascotaActual.fechaNacimiento,
      sexo: mascotaActual.sexo,
      color: mascotaActual.color,
      peso: mascotaActual.peso,
      informacionAdicional: mascotaActual.informacionAdicional,
      estado: "Activo"
    };

    nuevaMascota.nombreDueno = selectDuenos.find(dueno => dueno.duenoId == mascotaActual.duenoId).nombreCompleto;
    nuevaMascota.nombreRaza = selectRazas.find(raza => raza.razaId == mascotaActual.razaId).nombreRaza;
    if (modalTipo === 'editar') {
      nuevaMascota.mascotaId = mascotaActual.mascotaId
      const data = await putPets(nuevaMascota);
      if (data.success) setMacotas(prev => prev.map(m => m.mascotaId === nuevaMascota.mascotaId ? mascotaActual : m));

    } else {
      const data = await postPets(nuevaMascota);
      if (data.success) setMacotas(prev => [...prev, nuevaMascota]);
    }
    cerrarModal();
  };

  const handleEliminarConfirmado = async () => {
    const data = await deletePets(mascotaActual.mascotaId);
    if (data) setMacotas(prev => prev.filter(m => m.mascotaId !== mascotaActual.mascotaId));
    cerrarModal();
  };

  // Para traer los datos para un select 
  const selectPet = async () => {
    const data = await getSelectPets();
    if (data.success) {
      setSelectMascotas(data.data);
      return data.data;
    }
    return []
  };

  return {
    mascotas, modalVisible, modalTipo, mascotaActual, selectDuenos, selectRazas,
    razasFiltradas, selectCategorias, setMascotaActual, abrirModal, cerrarModal,
    handleSubmit, handleEliminarConfirmado, selectPet, selectMascotas, filtro, setFiltro
  };
};
