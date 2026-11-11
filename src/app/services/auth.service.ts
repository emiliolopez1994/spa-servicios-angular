import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Autenticación simulada con fines didácticos; no valida credenciales reales.
  private autenticado = true;

  estaAutenticado(): boolean {
    return this.autenticado;
  }

  iniciarSesion(): void {
    this.autenticado = true;
  }

  cerrarSesion(): void {
    this.autenticado = false;
  }

  obtenerTokenDemo(): string {
    return 'TOKEN_JWT_DE_PRUEBA_12345';
  }
}
