import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  console.log('AuthGuard: token =', token); // Debugging log

  if (!token) {
    console.log('AuthGuard: User is not authenticated, redirecting to login');
    router.navigate(['/login']);
    return false;
  }

  console.log('AuthGuard: User is authenticated');
  return true;
};
