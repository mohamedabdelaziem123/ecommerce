import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { ResetCodeComponent } from '../reset-code/reset-code.component';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,ResetCodeComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {


   errResponse!: string;
      load: boolean=false;
      Flag: boolean = true;
 
      constructor(private authservice:AuthService,private router: Router) {
        
      }
    
      
      forgetPasswordForm: FormGroup = new FormGroup({
  
        email: new FormControl('', [Validators.required, Validators.email]),
       
  
      },)
    
  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      this.load = true;
      this.authservice.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next: (res) => {
          
          this.load = false;
          this.Flag = false;
       
              
              
        },
        error: (err) => {
          
          this.errResponse = err.error.message;
          this.load = false;
              
        }
      })
    }
  
        
        
      }
}
