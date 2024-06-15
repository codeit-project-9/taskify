import axios from 'axios';
import { LOGIN_TOKEN } from './apiStrings';

const BASE_URL = 'https://sp-taskify-api.vercel.app/5-9/';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOGIN_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
