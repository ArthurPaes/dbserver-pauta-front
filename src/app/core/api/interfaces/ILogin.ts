export interface IRequestlogin {
  email: string;
  password: string;
}

export interface IResponseLogin {
  id: number;
  name: string
  cpf: string
  email: string
}
