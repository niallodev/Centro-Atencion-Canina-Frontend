import axios from 'axios';
const API_URL = import.meta.env.API_URL; // Cambia a tu URL backend

const api = axios.create({
  baseURL: API_URL || 'http://localhost:5000/api', // Usa tu variable de entorno
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
