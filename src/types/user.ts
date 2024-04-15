export type LoginData = {
   email: string,
   password: string,
};

export type RegisterData = LoginData & {
   name: string,
};

export type RegisterFormData = RegisterData & {
   password2: string,
};

export type User = Omit<RegisterData, 'password'> & {
  id: string
};