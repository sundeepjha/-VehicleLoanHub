import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router){}

  canActivate( route: ActivatedRouteSnapshot):  boolean  {
      const expectedRole = route.data["role"] as string;
      const role = this.auth.getRole();
      

      if(this.auth.isAuthenticated() && role == expectedRole){
        console.log("Hello");
        return true;
      }

      // redirect to the login if user is not authenticated
      this.router.navigate(["/login"]);
      return false;
  }
  
}
