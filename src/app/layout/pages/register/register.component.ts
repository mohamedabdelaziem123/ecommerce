import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { SignupSucess } from '../../../shared/interfaces/signup-sucess';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  errResponse!: string;
  load: boolean=false;

  constructor(private authservice:AuthService,private router: Router) {
    
  }

  passWordValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const pass = control.get('password');
    const confirmPass = control.get('rePassword');
    if (pass && confirmPass && confirmPass.value != pass.value) {

       confirmPass.setErrors({ mismatch: true })
      return   { mismatch: true } ;
        
    }
    else {
      return null;
    }
    
  };
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: this.passWordValidator })

  onSubmit() {
    if (this.registerForm.valid) {
      this.load = true;
      this.authservice.registerData(this.registerForm.value).subscribe({
        next: (res) => {
          const response = res as SignupSucess;
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
