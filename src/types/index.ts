export interface IUser {
  name: string,
  email: string,
  type: number,
  phone: string,
  active: number,
  password: string,
  id?: number,
  _id?: string
}

export interface ICustomer {
  name: string,
  birth?: string,
  email?: string,
  phone_number: string,
  document: string,
  active: number,
  password: string,
  id?: number,
  _id?: string
}
