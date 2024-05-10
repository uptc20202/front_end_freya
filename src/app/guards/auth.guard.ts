import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanMatchFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../api/services/Auth/auth.service';

export const AuthGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.getAuthToken();
};

