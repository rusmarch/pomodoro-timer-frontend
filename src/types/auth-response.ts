import { User } from 'src/types/user';

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};
