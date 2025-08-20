import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Owners
export const getOwners = async () =>  {
    try{
        const response = await get('/dueno');
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
// Create Owner
export const postOwners = async (nuevoDueno) =>  {
    try{
        console.log(nuevoDueno);
        const response = await post('/dueno', nuevoDueno);
        console.log(response.status);
        const data = response.data
        return { success: true, status:data };

    }catch (err) {
        console.log(err);
    if(err.response){
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}
// Edit Owner
export const putOwners = async (nuevoDueno) =>  {
    try{
        const response = await put(`/dueno/${nuevoDueno.duenoId}`, nuevoDueno);
        console.log(response);
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
// Delete Owner
export const deleteOwners = async (Id) =>  {
    try{
        const response = await put(`/dueno/${Id}`);
        console.log(response);
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
