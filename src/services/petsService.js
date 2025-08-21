import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Cantidad de Mascotas
export const getPetSummary = async () =>  {
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

// Select Pets
export const getSelectPets = async () =>  {
    try{
        const response = await get('/mascota/select');
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


// Pets
export const getPets = async () =>  {
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

// Pets
export const getOwnerPets = async (Id) =>  {
  console.log(Id);
    try{
        const response = await get(`/mascota/mascota/${Id}`);
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

// Create Pet
export const postPets = async (nuevaMascota) =>  {
    try{
        const response = await post('/mascota', nuevaMascota);
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
// Edit Pet
export const putPets = async (nuevaMascota) =>  {
    try{
        const response = await put(`/mascota/${nuevaMascota.mascotaId}`, nuevaMascota);
        console.log(response);
        const data = response.status
        console.log(data);
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
// Delete Pet
export const deletePets = async (Id) =>  {
    try{
        const response = await del(`/mascota/${Id}`);
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
