import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Cantidad de Citas
export const getQuoteSummary = async () =>  {
  try {
    const response = await get('/cita/count',);
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

// Quotes
export const getQuotes = async () =>  {
    try{
        const response = await get('/cita');
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


// Create Quote
export const postQuotes = async (nuevaCita) =>  {
    try{
        const response = await post('/cita', nuevaCita);
        const data = response.status
        return { success: true, status:data };

    }catch (err) {
    if(err.response){
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}
// Edit Quote
export const putQuotes = async (nuevaCita) =>  {
    try{
        const response = await put(`/cita/${nuevaCita.citaId}`, nuevaCita);
        const data = response.status
        return { success: true, status:data };

    }catch (err) {
      if(err.response){
        return { success: false, message: err.response.data };
      } else {
        return { success: false, message: 'Error de conexión con el servidor.' };
      }
    }
}
// Delete Quote
export const deleteQuotes = async (Id) =>  {
    try{
        const response = await del(`/cita/${Id}`);
        const data = response.status
        return { success: true, status:data };

    }catch (err) {
    if(err.response){
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}
