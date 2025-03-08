import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {


        errResponse!: string;
        load: boolean=false;
  
   
        constructor(private authservice:AuthService,private router:Router) {
          
        }
      
        
        newPasswordForm: FormGroup = new FormGroup({
    
          email: new FormControl('', [Validators.required, Validators.email]),
          newPassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,}$/)]),
         
    
        },)
      
    onSubmit() {
      if (this.newPasswordForm.valid) {
        this.load = true;
        this.authservice.newPassword(this.newPasswordForm.value).subscribe({
          next: (res) => {
            
            this.load = false;
            this.router.navigate(["/home"])
            localStorage.setItem("token", res.token);
            this.authservice.decodeData();
                
                
          },
          error: (err) => {
            
            this.errResponse = err.error.message;
            this.load = false;
                
          }
        })
      }
    
          
          
        }
}
