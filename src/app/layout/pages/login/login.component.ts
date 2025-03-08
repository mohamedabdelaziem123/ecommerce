import { Component } from '@angular/core';
import {  FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SigninSuccess } from '../../../shared/interfaces/signin-success';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


    
    errResponse!: string;
    load: boolean=false;
  
    constructor(private authservice:AuthService,private router: Router) {
      
    }
  
  
      
    
    loginForm: FormGroup = new FormGroup({

      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),

    },)
  
onSubmit() {
  if (this.loginForm.valid) {
    this.load = true;
    this.authservice.signinData(this.loginForm.value).subscribe({
      next: (res) => {
        const response = res as SigninSuccess;
        // console.log(response.token);
        localStorage.setItem("token", response.token);
        this.router.navigate(["/home"]);
        this.authservice.decodeData();
        this.load = false;
            
            
      },
      error: (err) => {
        this.errResponse = err.error.message;
        this.load = false;
            
      }
    })
  }

      
      
    }
  }
