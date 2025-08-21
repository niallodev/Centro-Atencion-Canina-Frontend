import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Select Services
export const getSelectServices = async () =>  {
    try{
        const response = await get('/servicio/select');
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

// Services
export const getServices = async () =>  {
    try{
        const response = await get('/mascota');
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

