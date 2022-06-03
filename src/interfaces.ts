export interface CredentialsType {
  loginValue: string;
  passwordValue: string;
}

export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  sex: 'male' | 'female' | '';
  login: string;
  password: string;
  state: 'active' | 'blocked';
}

export interface AppStateInterface {
  auth: {
    isAuth: boolean;
    loginValue: string;
    passwordValue: string;
  };
  user: {
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    meta: { loginDate: string; registerDate: string };
    sex: 'female' | 'male' | '';
    state: 'active';
  };
  users: UserType[];
}
