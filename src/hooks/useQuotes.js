import { useState, useEffect } from 'react';
import { getQuotes, getServiceQuotes, postQuotes, putQuotes, deleteQuotes } from '../services/quotesService'
import { usePets, useServices, useUsers } from './hooks'

export const useQuotes = (page = 0) => {

  const { selectMascotas, selectPet } = usePets();
  const { selectServicios, selectService } = useServices();
  const { selectUsuarios, selectUser } = useUsers();

  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroProfesional, setFiltroProfesional] = useState('');
  const [filtroMascota, setFiltroMascota] = useState('');

  const [citas, setCitas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo, setModalTipo] = useState(''); // 'agregar' | 'editar' | 'eliminar'
  const [citaActual, setCitaActual] = useState();

  useEffect(() => {
    async function fetchData() {
      let pets;
      if (page === 0) pets = await getQuotes();
      else pets = await getServiceQuotes(page);

      await selectPet();
      await selectService();
      await selectUser();
      setCitas(pets.data);
    }
    fetchData();
  }, []);


  const abrirModal = async (tipo, cita = null) => {
    let mascotas, servicios, profesionales;
    if (tipo != 'elimiar') {
      mascotas = await selectPet();
      servicios = await selectService();
      profesionales = await selectUser();
    }
    if (tipo === 'editar') {
      const mascotaSeleccionada = mascotas.find(mascota => mascota.nombreMascota === cita.nombreMascota);
      const servicioSeleccionado = servicios.find(servicio => servicio.nombreServicio == cita.nombreServicio)
      const profesionalSeleccionado = profesionales.find(profesional => profesional.nombreCompleto == cita.nombreProfesional)
      cita.mascotaId = mascotaSeleccionada.mascotaId
      cita.servicioId = servicioSeleccionado.servicioId
      cita.profesionalId = profesionalSeleccionado ? profesionalSeleccionado.usuarioId : ''
    }
    setModalTipo(tipo);
    setCitaActual(cita);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setCitaActual(null);
    setModalTipo('');
  };

  const handleSubmit = async (e) => {
    // falta validaciones
    console.log(citaActual);
    e.preventDefault();
    const nuevaCita = {
      mascotaId: citaActual.mascotaId,
      servicioId: citaActual.servicioId,
      fechaHora: citaActual.fechaHora,
      profesionalId: citaActual.profesionalId !== "" ? citaActual.profesionalId : null,
      motivo: citaActual.motivo,
      estado: "Pendiente"
    };
    console.log(nuevaCita);
    nuevaCita.nombreMascota = selectMascotas.find(mascota => mascota.mascotaId == citaActual.mascotaId).nombreMascota;
    nuevaCita.nombreServicio = selectServicios.find(servicio => servicio.servicioId == citaActual.servicioId).nombreServicio;
    const profesional = selectUsuarios.find(usuario => usuario.usuarioId == citaActual.profesionalId);
    nuevaCita.nombreProfesional = profesional ? profesional.nombreCompleto : '';

    if (modalTipo === 'editar') {
      nuevaCita.citaId = citaActual.citaId
      nuevaCita.estado = citaActual.estado
      const data = await putQuotes(nuevaCita);
      if (data.success) setCitas(prev => prev.map(c => c.citaId === nuevaCita.citaId ? nuevaCita : c));

    } else {
      const data = await postQuotes(nuevaCita);
      if (data.success) setCitas(prev => [...prev, nuevaCita]);
    }
    cerrarModal();
  };

  const handleEliminarConfirmado = async () => {
    const data = await deleteQuotes(citaActual.citaId);
    if (data) setCitas(prev => prev.filter(c => c.citaId !== citaActual.citaId));
    cerrarModal();
  };

  const citasFiltradas = citas.filter(cita => {
  const coincideFecha = filtroFecha ? cita.fechaHora.startsWith(filtroFecha) : true;
  const coincideProfesional = filtroProfesional ? cita.nombreProfesional === filtroProfesional : true;
  const coincideMascota = filtroMascota ? cita.nombreMascota === filtroMascota : true;
  return coincideFecha && coincideProfesional && coincideMascota;
});


  return {
    citas, modalVisible, modalTipo, citaActual, selectMascotas, selectServicios, selectUsuarios,
    setCitaActual, abrirModal, cerrarModal, handleSubmit, handleEliminarConfirmado,
    filtroFecha, setFiltroFecha, filtroProfesional, setFiltroProfesional,
    filtroMascota, setFiltroMascota, citasFiltradas,
  };
};
