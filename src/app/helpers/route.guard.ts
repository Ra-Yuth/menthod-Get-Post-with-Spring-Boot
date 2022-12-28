import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private router: Router) {
  }
  auth: any;
  canActivate(): boolean{
    if (localStorage.getItem('auth')){
      this.auth = JSON.parse(localStorage.getItem('auth') ?? '')
    }
     ;
    const token = this.auth?.token;
    if (!token){
      localStorage.removeItem('auth');
      this.router.navigate(['auth/login']).then();
      return false;
    }
    return true;
  }

}
