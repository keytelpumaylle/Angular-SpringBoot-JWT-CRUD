import { inject, Injectable } from '@angular/core';
import { Observable, throwError, EMPTY  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './service/auth.service';

export const Interceptor: HttpInterceptorFn = (req, next) =>{
  const token = localStorage.getItem('token');
  const authService = inject(AuthService);
  console.log(token);

  let authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq).pipe(
    catchError((err) => {
      authService.logout();
      return EMPTY;
    })
  )
  
  
}
