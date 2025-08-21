import { useState, useEffect } from 'react';
import { getSelectCategories, getCategories, postCategories, putCategories, deleteCategories } from '../services/categoriesServices'

const mockCategorias = {
  1: [],
};


export const useCategories = () => {
  const [categorias, setCategorias] = useState([]);
  const [selectCategorias, setSelectCategories] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCategoriesVisible, setModalRazasVisible] = useState(false);
    const [modalTipo, setModalTipo] = useState(''); // 'agregar' | 'editar' | 'eliminar'
    const [categoriaActual, setCategoriaActual] = useState();
    useEffect(() => {
      async function fetchData() {
        const categories = await getCategories();
        setCategorias(categories.data);
      }
      fetchData();
      }, []);

    const abrirModal = (tipo, categoria = null) => {
      setModalTipo(tipo);
      setCategoriaActual(categoria);
      setModalVisible(true);
    };

    const abrirModalRazas = (categoria) => {
      setCategoriaActual(categoria);
      setModalRazasVisible(true);
    };

    const cerrarModal = () => {
      setModalVisible(false);
      setCategoriaActual(null);
      setModalTipo('');
    };

  const cerrarModalCategories = () => {
    setModalRazasVisible(false);
    setCategoriaActual(null);
  };

  //!
  const handleSubmit = async (e) => {
    // falta validaciones
    console.log(categoriaActual);
    e.preventDefault();
    const nuevoDueno = {
      // id: categoriaActual?.id || Date.now(),
      nombreCompleto: categoriaActual.nombreCompleto,
      tipoIdentificacion: categoriaActual.tipoIdentificacion,
      numeroIdentificacion: categoriaActual.numeroIdentificacion,
      direccion: categoriaActual.direccion,
      telefono: categoriaActual.telefono,
      email: categoriaActual.email,
      estado: "Activo"
    };
    if (modalTipo === 'editar') {
      console.log(nuevoDueno);
      nuevoDueno.razaId = categoriaActual.razaId
      const data = await putCategories(nuevoDueno);
      if (data.success) setCategorias(prev => prev.map(d => d.razaId  === nuevoDueno.razaId  ? nuevoDueno : d));

    } else {
      const data = await postCategories(nuevoDueno);
      if (data.success) setCategorias(prev => [...prev, nuevoDueno]);
    }
    cerrarModal();
  };

  const handleEliminarConfirmado = async () => {
    const data = await deleteCategories(categoriaActual.razaId);
    if (data) setCategorias(prev => prev.filter(d => d.razaId !== categoriaActual.razaId));
    cerrarModal();
  }; 
  
  // Para traer los datos para un select 
  const selectCategory = async () => {
    const data = await getSelectCategories();
    console.log(data);
    if (data) {
      setSelectCategories(data.data);
      return data.data;
    }
    return []
  }; 
  
  return {
    categorias, modalVisible, modalCategoriesVisible, modalTipo, categoriaActual,
    setCategoriaActual, abrirModal, abrirModalRazas, cerrarModal, cerrarModalCategories, 
    handleSubmit, handleEliminarConfirmado, 
    mockCategorias,
    selectCategory, selectCategorias
  };
};
