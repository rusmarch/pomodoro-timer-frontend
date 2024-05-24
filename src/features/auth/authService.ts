import axios from 'axios';
import { $api } from 'src/http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from 'src/types/AuthResponse';
import { API_URL } from 'src/http';
import { LoginData, RegisterData } from 'src/types/user';

const registration = async (requestData: RegisterData) => {
  return $api.post<AuthResponse>('/registration', requestData);
};

const login = async (requestData: LoginData) => {
  return $api.post<AuthResponse>('/login', requestData);
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
