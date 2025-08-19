import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Cantidad de Mascotas
export const getAppointment = async () =>  {
  try {
    console.log("Citas");
    const response = await get('/cita/count',);
    console.log("response", response);
    const data = response.data
    console.log(data);
    return { success: true, data:data };
  }catch (err) {
    if(err.response){
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
    
  }
}