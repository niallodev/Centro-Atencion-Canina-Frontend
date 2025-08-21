import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Select Owners
export const getSelectOwners = async () => {
  try {
    const response = await get('/dueno/select');
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

// Owners
export const getOwners = async () => {
  try {
    const response = await get('/dueno');
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

// Create Owner
export const postOwners = async (nuevoDueno) => {
  try {
    const response = await post('/dueno', nuevoDueno);
    const data = response.status
    return { success: true, status: data };

  } catch (err) {
    if (err.response) {
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}

// Edit Owner
export const putOwners = async (nuevoDueno) => {
  try {
    const response = await put(`/dueno/${nuevoDueno.duenoId}`, nuevoDueno);
    const data = response.status
    return { success: true, status: data };

  } catch (err) {
    if (err.response) {
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}

// Delete Owner
export const deleteOwners = async (Id) => {
  try {
    const response = await del(`/dueno/${Id}`);
    const data = response.status
    return { success: true, status: data };

  } catch (err) {
    if (err.response) {
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}
