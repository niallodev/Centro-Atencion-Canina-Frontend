import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL; // Cambia a tu URL backend

const api = axios.create({
  baseURL: API_URL || 'http://localhost:5000/api', // Usa tu variable de entorno
  headers: {
    'Content-Type': 'application/json',
  },
});

// Métodos genéricos para GET, POST, PUT, DELETE
const get = (url, config = {}) => api.get(url, config);
const post = (url, data, config = {}) => api.post(url, data, config);

const put = (url, data, config = {}) => api.put(url, data, config);
const del = (url, config = {}) => api.delete(url, config);

export { get, post, put, del };

