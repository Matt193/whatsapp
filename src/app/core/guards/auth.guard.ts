// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth.service'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.authService.getUserAuthState().pipe(
      take(1), // Toma el primer valor emitido y se desuscribe
      map(user => {
        const isAuthenticated = !!user; // true si 'user' no es null/undefined
        if (isAuthenticated) {
          return true; // Usuario autenticado, permite el acceso
        } else {
          // Usuario no autenticado, redirige a login
          console.log('AuthGuard: Usuario no autenticado, redirigiendo a login.');
          return this.router.createUrlTree(['/auth/login']); // O this.router.navigate(['/auth/login']); return false;
        }
      })
    );
  }
}