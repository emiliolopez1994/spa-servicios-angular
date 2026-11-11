import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public readonly auth: AuthService, private readonly router: Router) {}

  salir(): void {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
