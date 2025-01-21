import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/v1/api', // Base URL de tu API
  timeout: 5000, // Tiempo de espera en milisegundos
});

export default api;
