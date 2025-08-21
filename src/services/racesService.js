
import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Select Owners
export const getSelectRaces = async () =>  {
    try{
        const response = await get('/raza/select');
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


// Races
export const getRaces = async () =>  {
    try{
        const response = await get('/raza');
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

// Create Race
export const postRaces = async (nuevaRaza) =>  {
    try{
        const response = await post('/raza', nuevaRaza);
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
// Edit Race
export const putRaces = async (nuevaRaza) =>  {
    try{
        const response = await put(`/raza/${nuevaRaza.razaId}`, nuevaRaza);
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
// Delete Race
export const deleteRaces = async (Id) =>  {
    try{
        const response = await del(`/raza/${Id}`);
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
