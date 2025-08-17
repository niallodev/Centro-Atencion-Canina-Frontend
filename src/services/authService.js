const API_URL = import.meta.env.API_URL; // Cambia a tu URL backend

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Error en login');
  }

  const data = await res.json();
  // Guardar token o info en localStorage si hay
  localStorage.setItem('token', data.token);
  return data;
}


// src/services/mascotaService.js
import api from '../api/axios';

export const postLogin = () => api.post('/login')

// export const getMascotas = () => api.get('/mascotas');

// export const getMascotaById = (id) => api.get(`/mascotas/${id}`);

// export const crearMascota = (data) => api.post('/mascotas', data);

// export const actualizarMascota = (id, data) => api.put(`/mascotas/${id}`, data);

// export const eliminarMascota = (id) => api.delete(`/mascotas/${id}`);
