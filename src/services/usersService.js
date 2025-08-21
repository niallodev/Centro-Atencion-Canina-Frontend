import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Select Users
export const getSelectUsers = async () =>  {
    try{
        const response = await get('/usuario/select');
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


// Users
export const getUsers = async () =>  {
    try{
        const response = await get('/usuario');
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

// Create User
export const postUsers = async (nuevoUsuario) =>  {
    try{
        const response = await post('/usuario', nuevoUsuario);
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
// Edit User
export const putUsers = async (nuevoUsuario) =>  {
    try{
        const response = await put(`/usuario/${nuevoUsuario.usuarioId}`, nuevoUsuario);
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
// Delete User
export const deleteUsers = async (Id) =>  {
    try{
        const response = await del(`/usuario/${Id}`);
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
