export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type RegisterFormData = RegisterData & {
  password2: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  isActivated: boolean;
};

export type UserState = User | null;
