export interface SignupData {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
    photo: string;
  }


  export interface LoginData {
    email: string;
    password: string;
  }