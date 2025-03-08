import { UserEmail } from "./signup-sucess";

export interface SignupData extends UserEmail{
    
  name: string;
  password: string;
  rePassword: string;
  phone: string;

}
