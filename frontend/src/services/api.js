import axios from 'axios';

// Configuração base da API (backend)
const api = axios.create({
  baseURL: 'http://127.0.0.1:8001', // Porta que estamos usando
});

// Interceptador para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;