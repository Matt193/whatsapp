// src/app/core/guards/login.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.getUserAuthState().pipe(
      take(1),
      map(user => {
        const isAuthenticated = !!user;
        if (isAuthenticated) {
          // Usuario ya autenticado, redirige a la página principal
          console.log('LoginGuard: Usuario ya autenticado, redirigiendo a tabs/home.');
          return this.router.createUrlTree(['/tabs/home']); // O this.router.navigate(['/tabs/home']); return false;
        } else {
          return true; // Usuario no autenticado, permite el acceso a login/register
        }
      })
    );
  }
}