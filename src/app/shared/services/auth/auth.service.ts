import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../../../enviroment/enviroment';
import { SignupFail } from '../../interfaces/signup-fail';
import { resetCodedata, SignupSucess, UserEmail } from '../../interfaces/signup-sucess';
import { SignupData } from '../../interfaces/signup-data';
import { SigninSuccess } from '../../interfaces/signin-success';
import { SigninData } from '../../interfaces/signin-data';
import { SigninFail } from '../../interfaces/signin-fail';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NewPassword } from '../../interfaces/new-password';
import { nobackloginGuard } from '../../guards/nobacklogin/nobacklogin.guard';
import { authGuard } from '../../guards/auth/auth.guard';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  myloginguard: CanActivateFn = nobackloginGuard
  myauthguard: CanActivateFn = authGuard
  verfiedtoken:boolean=true
  userData: BehaviorSubject<JwtPayload |null>=new BehaviorSubject<JwtPayload |null>(null);
  constructor(private httpclient: HttpClient, @Inject(PLATFORM_ID) private id: object,private router: Router) {
    
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem("token") != null) {
        // this.decodeData();

        this.verfiytoken().subscribe({
          next: (res) => {
            this.myloginguard
            
            this.myauthguard
            this.decodeData();
            
          },
          error: err => {
            this.verfiedtoken = false
            this.myauthguard
            this.logout();
          }
        })
        
       }
      
    }
   }

  registerData(signupdata:SignupData):Observable<SignupFail|SignupSucess> {
    return this.httpclient.post<SignupFail | SignupSucess>(enviroment.baseURL+"/api/v1/auth/signup",signupdata);
  }

 signinData(signindata:SigninData):Observable<SigninFail|SigninSuccess> {
    return this.httpclient.post<SigninFail|SigninSuccess>(enviroment.baseURL+"/api/v1/auth/signin",signindata);
  }
  forgetPassword(forgetPasswordemail:UserEmail):Observable<any> {
    return this.httpclient.post(enviroment.baseURL+"/api/v1/auth/forgotpasswords",forgetPasswordemail);
  }
  newPassword(newData:NewPassword):Observable<any> {
    return this.httpclient.put(enviroment.baseURL+"/api/v1/auth/resetpassword",newData);////////////////////////////////
  }
  resetCode(code:resetCodedata):Observable<any> {
    return this.httpclient.post(enviroment.baseURL+"/api/v1/auth/verifyResetCode",code);
  }
  verfiytoken():Observable<any> {
    return this.httpclient.get(enviroment.baseURL+"/api/v1/auth/verifyToken", {
      headers :{
        token: localStorage.getItem("token") || ''
      }
    });
  }

  decodeData():void {
    const token :string = localStorage.getItem("token")|| '';
    const decoded :JwtPayload= jwtDecode(token);
    this.userData.next(decoded);
    
}
  logout(){
    localStorage.removeItem("token");
    this.userData.next(null);
    this.router.navigate(["/login"]);
  }

  nologback():boolean {
    return !!localStorage.getItem('token');
  }
}
