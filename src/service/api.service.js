import axios from 'axios';

axios.interceptors.request.use((options) => {
  const token = window.sessionStorage.getItem('jwt');
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  return options;
});

const ApiService = axios.create({
  baseURL: 'http://localhost:5012/api',
  timeout: 15000,
  responseType: 'json',
});

export default ApiService;
