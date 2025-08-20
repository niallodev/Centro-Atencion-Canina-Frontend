import { post, get, put, del } from '../api/axios'; // Importa los métodos

// Login
export const postLogin = async (username, password) =>  {
  try {
    const response = await post('/usuario/login', { 
      NombreUsuario: username, 
      Contrasenia: password 
    });
    const data = response.data
    sessionStorage.setItem('nombre', data.nombreCompleto);
    sessionStorage.setItem('usuario', data.nombreUsuario);
    sessionStorage.setItem('rol', data.rol);
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('userId', data.usuarioId);
    console.log(data);
    return { success: true };
  }catch (err) {
    console.log(err);
    if(err.response){
      return { success: false, message: err.response.data };
    } else {
      return { success: false, message: 'Error de conexión con el servidor.' };
    }
  }
}

// Recuperar Contraseña
export const pacthForgotPassword = async (email) =>  {
  console.log(email);
  await put(`/usuario/recuperar/${email}`, { 
    Emial: email
  })
  return true;
}

// Cierre de Sesión
export const postLogout = async () =>  {
  const id = sessionStorage.getItem('userId');
  if (null) await post(`/usuario/logout/${id}`)
  sessionStorage.clear();
  return true;
}


// // Obtener todos los usuarios
// export const getUsers = () => {
//   return get('/users');
// }

// // Actualizar usuario
// export const updateUser = (userId, data) => {
//   return put(`/users/${userId}`, data);
// }

// // Eliminar usuario
// export const deleteUser = (userId) => {
//   return del(`/users/${userId}`);
// }

// // Ejemplo de uso para otras rutas
// export const getPets = () => {
//   return get('/pets');
// };
//!


// const API_URL = import.meta.env.API_URL; // Cambia a tu URL backend

// export async function login(email, password) {
//   const res = await fetch(`${API_URL}/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) {
//     throw new Error('Error en login');
//   }

//   const data = await res.json();
//   // Guardar token o info en localStorage si hay
//   localStorage.setItem('token', data.token);
//   return data;
// }

//!
// src/services/mascotaService.js
// import api from '../api/axios';

// export const postLogin = () => api.post('/login')

// export const getMascotas = () => api.get('/mascotas');

// export const getMascotaById = (id) => api.get(`/mascotas/${id}`);

// export const crearMascota = (data) => api.post('/mascotas', data);

// export const actualizarMascota = (id, data) => api.put(`/mascotas/${id}`, data);

// export const eliminarMascota = (id) => api.delete(`/mascotas/${id}`);
