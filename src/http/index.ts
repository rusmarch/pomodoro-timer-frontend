import axios from 'axios';
import { AuthResponse } from 'src/types/auth-response';

export const API_URL = `https://pt-server.pp.ua/api`;
// export const API_URL = `http://localhost:5001/api`;

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// request interceptor
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

// response interceptor
$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      error.config._isRetry
    ) {
      try {
        console.log('STARTING HANDLING ERROR');
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        console.log('/refresh has worked out');
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('NOT AUTHORIZED');
      }
    }
    throw error;
  }
);
