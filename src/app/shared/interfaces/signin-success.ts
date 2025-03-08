import { UserEmail } from "./signup-sucess";

export interface SigninSuccess {
  message: string;
  user: User;
  token: string;

}
export interface User extends UserEmail{
    name: string;
    role: string;
}
  
