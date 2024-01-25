import { Observable } from 'rxjs';
// src/app/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthservicesService } from '../services/authservices.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthservicesService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      console.log('User not authenticated. Redirecting to login page.');
      Swal.fire(
        'First Login Your Page',
        'Can not redirect your page',
        'error'
      );
      this.router.navigate(['/login']);
      return false;
    }
  }
}
