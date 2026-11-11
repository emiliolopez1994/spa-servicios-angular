import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Solo para esta práctica: token ficticio visible en la pestaña Network.
    // No representa autenticación ni debe usarse en una aplicación real.
    if (this.auth.estaAutenticado() && request.url.startsWith('https://jsonplaceholder.typicode.com/')) {
      const autorizada = request.clone({
        setHeaders: { Authorization: `Bearer ${this.auth.obtenerTokenDemo()}` }
      });
      return next.handle(autorizada);
    }
    return next.handle(request);
  }
}
