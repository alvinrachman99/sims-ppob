import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://take-home-test-api.nutech-integrasi.com',
});

export default axiosInstance;