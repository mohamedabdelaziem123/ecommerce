import { CanActivateFn, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let authservice: AuthService = inject(AuthService);
  let router: Router = inject(Router);

  if (localStorage.getItem("token")) {
    if (!authservice.verfiedtoken) {
      return false
    }
    return true;
  }
else {

router.navigate(["/login"]);
return false
}




  
 
};
