import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { NewPasswordComponent } from '../new-password/new-password.component';

@Component({
  selector: 'app-reset-code',
  imports: [ReactiveFormsModule,NewPasswordComponent],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss'
})
export class ResetCodeComponent {


  
  
     errResponse!: string;
        load: boolean=false;
          Flag: boolean = true;
        constructor(private authservice:AuthService) {
          
        }
      
        
        resetCodeForm: FormGroup = new FormGroup({
    
          resetCode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{4,}$/)]),
         
    
        },)
      
    onSubmit() {
      if (this.resetCodeForm.valid) {
        this.load = true;
        this.authservice.resetCode(this.resetCodeForm.value).subscribe({
          next: (res) => {
            
            
            this.load = false;
            this.Flag = false;
                
                
          },
          error: (err) => {
           
            ;
            this.errResponse = err.error.message;
            this.load = false;
                
          }
        })
      }
    
          
          
        }
}
