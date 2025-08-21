
import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Select Categories
export const getSelectCategories = async () => {
  try {
    const response = await get('/categoria/select');
    const data = response.data
    return { success: true, data: data };

  } catch (err) {
    if (err.response) {
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}

// Categories
export const getCategories = async () => {
  try {
    const response = await get('/categoria');
    const data = response.data
    return { success: true, data: data };

  } catch (err) {
    if (err.response) {
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}

// Create Category
export const postCategories = async (nuevaCategoria) => {
  try {
    const response = await post('/categoria', nuevaCategoria);
    const data = response.status
    return { success: true, status: data };

  } catch (err) {
    if (err.response) {
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}

// Edit Category
export const putCategories = async (nuevaCategoria) => {
  try {
    const response = await put(`/categoria/${nuevaCategoria.categoriaId}`, nuevaCategoria);
    const data = response.status
    return { success: true, status: data };

  } catch (err) {
    if (err.response) {
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}

// Delete Category
export const deleteCategories = async (Id) => {
  try {
    const response = await del(`/categoria/${Id}`);
    const data = response.status
    return { success: true, status: data };

  } catch (err) {
    if (err.response) {
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}
