import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  entrar(): void {
    this.auth.iniciarSesion();
    this.router.navigate(['/tareas']);
  }
}
