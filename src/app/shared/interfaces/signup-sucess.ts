 
  export interface SignupSucess {
  message: string;
  user: User;
  token: string;
}

export interface User extends UserEmail {
  name: string;
  role: string;
}

export interface UserEmail {
  email: string;
}

export interface resetCodedata {
  resetCode: string;
}
