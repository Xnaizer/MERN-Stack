export type TRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TLogin = {
  identifier: string;
  password: string;
};

export type TPagination = {
  totalPages: number;
  current: number;
  totalData: number;
};
