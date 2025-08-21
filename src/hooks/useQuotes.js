import { useState, useEffect } from 'react';
import { getQuotes, postQuotes, putQuotes, deleteQuotes } from '../services/quotesService'
import { usePets, useServices, useUsers } from './hooks'

export const useQuotes = () => {

    const { selectMascotas, selectPet } = usePets();
    const { selectServicios, selectService } = useServices();
    const { selectUsuarios, selectUser } = useUsers();
    
    const [citas, setCitas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTipo, setModalTipo] = useState(''); // 'agregar' | 'editar' | 'eliminar'
    const [citaActual, setCitaActual] = useState();
    
    useEffect(() => {
      async function fetchData() {
        const pets = await getQuotes();
        setCitas(pets.data);
      }
      fetchData();
      }, []);

      
    const abrirModal = async (tipo, cita = null) => {
      let mascotas, servicios, profesionales;
      if(tipo != 'elimiar'){
        mascotas = await selectPet();
        servicios = await selectService();
        profesionales = await selectUser();
      }
      console.log(mascotas, servicios, profesionales);
      if( tipo === 'editar'){
        const mascotaSeleccionada = mascotas.find(mascota => mascota.nombreMascota === cita.nombreRaza);
        const servicioSeleccionado = servicios.find(servicio => servicio.nombreServicio == cita.nombreDueno)
        const profesionalSeleccionado = profesionales.find(profesional => profesional.nombreCompleto == cita.nombreDueno)

        cita.mascotaId = mascotaSeleccionada.mascotaId
        cita.servicioId = servicioSeleccionado.servicioId
        cita.profesionalId = profesionalSeleccionado.profesionalId
        
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
      profesionalId: citaActual.profesionalId,
      motivo: citaActual.motivo,
      estado: "Activo"
    };
    if (modalTipo === 'editar') {
      nuevaCita.citaId = citaActual.citaId
      const data = await putQuotes(nuevaCita);
      if (data.success) setCitas(prev => prev.map(c => c.citaId  === nuevaCita.citaId  ? citaActual : c));

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

  return {
    citas, modalVisible, modalTipo, citaActual, selectMascotas, selectServicios, selectUsuarios, 
    setCitaActual, abrirModal, cerrarModal, handleSubmit, handleEliminarConfirmado
  };
};
