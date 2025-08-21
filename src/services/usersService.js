import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Select Users
export const getSelectUsers = async () => {
  try {
    const response = await get('/usuario/select');
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

// Users
export const getUsers = async () => {
  try {
    const response = await get('/usuario');
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
