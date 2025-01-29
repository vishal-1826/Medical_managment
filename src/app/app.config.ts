import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()), // ✅ Ensures interceptors work
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    , AuthGuard// ✅ Registers interceptor globally
  ]
};
