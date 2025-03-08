import { inject } from '@angular/core';
import { CanActivateFn, NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const nobackloginGuard: CanActivateFn = (route, state) => {
 

  let authservice: AuthService = inject(AuthService);
  let router: Router = inject(Router);
  

  if (authservice.nologback()) {
 
    router.navigate(["/home"]);
    return false;
  }
  
    return true
      
      
};
