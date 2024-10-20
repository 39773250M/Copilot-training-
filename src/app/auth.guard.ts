import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../src/services/auth/auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      // if (route.routeConfig?.path === 'add-visit/:id' ) {
      //   return this.router.createUrlTree(['/login']);
      // }
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}