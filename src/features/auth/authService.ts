import axios from 'axios';
import { $api } from 'src/http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from 'src/types/AuthResponse';
import { API_URL } from 'src/http';

const registration = async (
  email: string,
  password: string,
  name: string
): Promise<AxiosResponse<AuthResponse>> => {
  return $api.post<AuthResponse>('/registration', { email, password, name });
};

const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> => {
  return $api.post<AuthResponse>('/login', { email, password });
};

const logout = (): Promise<void> => {
  return $api.post('/logout');
};

const checkAuth = async (): Promise<AxiosResponse<AuthResponse>> => {
  return await axios.get<AuthResponse>(`${API_URL}/refresh`, {
    withCredentials: true,
  });
};

export const authService = {
  registration,
  login,
  logout,
  checkAuth,
};
