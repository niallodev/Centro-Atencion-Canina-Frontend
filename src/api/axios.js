import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL; // Cambia a tu URL backend

const api = axios.create({
  baseURL: API_URL || 'http://localhost:5000/api', // Usa tu variable de entorno
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adjuntar token Y verificar expiración
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); // o localStorage
  if (token) {
    if (isTokenExpired(token)) {
      console.warn('Token expirado. Cerrando sesión...');
      sessionStorage.removeItem('token'); // o localStorage
      window.location.href = '/login'; // Redirige al login (ajusta según tu ruta)
      throw new axios.Cancel('Token expirado');
    }

    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



// Métodos genéricos para GET, POST, PUT, DELETE
const get = (url, config = {}) => api.get(url, config);
const post = (url, data, config = {}) => api.post(url, data, config);
const put = (url, data, config = {}) => api.put(url, data, config)
const del = (url, config = {}) => api.delete(url, config);

function isTokenExpired(token) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000); // segundos
    return exp < now;
  } catch (error) {
    return true; // Si falla la decodificación, lo tratamos como expirado
  }
}


export { get, post, put, del };

