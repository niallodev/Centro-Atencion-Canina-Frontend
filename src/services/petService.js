import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Cantidad de Mascotas
export const getPet = async () =>  {
  try {
    const response = await get('/mascota/count',);
    const data = response.data
    return { success: true, data:data };
  }catch (err) {
    if(err.response){
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
    
  }
}