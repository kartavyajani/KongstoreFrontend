import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    
      if (this.isLoggedIn()) {
        return true;
      }
      else {
        return false;
      } 
  }
  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('AuthToken') == 'loggedIn' || localStorage.getItem('AuthToken') != undefined) {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }
  
}
