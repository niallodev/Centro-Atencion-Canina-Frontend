
import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Select Races
export const getSelectRaces = async () => {
  try {
    const response = await get('/raza/select');
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

// Races
export const getRaces = async () => {
  try {
    const response = await get('/raza');
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
