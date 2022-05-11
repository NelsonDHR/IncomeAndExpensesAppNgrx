import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router){
    
  }

  canActivate(): Observable<boolean>{

    //tap throws secondary effects
  
    return this.authService.isAuth().pipe(
      tap((state) => {
        if(!state) {this.router.navigate(['/login'])}
      }));
  }

  canLoad(): Observable<boolean>{

    //tap throws secondary effects
  
    return this.authService.isAuth().pipe(
      tap((state) => {
        if(!state) {this.router.navigate(['/login'])}
      }),
      //se cancela la suscripcon cuando se resuelve por primera vez
      //When you are interested in only the first emission, you want to use take. 
      //Maybe you want to see what the user first clicked on when they entered the page, or you would want to subscribe to the click event and just take the first emission.
      take(1)
      
      );
  }
  
}
