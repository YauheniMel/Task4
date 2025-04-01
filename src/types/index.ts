export type StateType = 'online' | 'blocked' | 'offline';

export type SexType = 'male' | 'female';

export interface ICredentials {
  login: string;
  password: string;
}

export interface IUser extends ICreateUser {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  sex: SexType;
  login: string;
  password: string;
  state: StateType;
}
