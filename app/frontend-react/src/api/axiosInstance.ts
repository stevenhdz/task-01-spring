import axios from 'axios';
import i18n from '../i18n';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(config => {
  config.headers = config.headers || {};
  config.headers['Accept-Language'] = i18n.language || 'pt';
  return config;
});

export default axiosInstance;
