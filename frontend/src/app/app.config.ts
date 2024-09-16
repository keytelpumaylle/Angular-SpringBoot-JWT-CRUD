import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Interceptor } from './interceptor.interceptor';
import { HTTP_INTERCEPTORS, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([Interceptor])),
    
  ]
};
