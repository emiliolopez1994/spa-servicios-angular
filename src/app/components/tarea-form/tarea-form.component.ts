import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea } from '../../models/tarea.model';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-tarea-form',
  standalone: false,
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.css']
})
export class TareaFormComponent {
  nuevaTarea: Tarea = {
    titulo: '', descripcion: '', completada: false, prioridad: 'Media'
  };

  constructor(private readonly tareas: TareaService, private readonly router: Router) {}

  guardar(): void {
    if (!this.nuevaTarea.titulo.trim() || !this.nuevaTarea.descripcion.trim()) { return; }
    this.tareas.agregarTarea({
      ...this.nuevaTarea,
      titulo: this.nuevaTarea.titulo.trim(),
      descripcion: this.nuevaTarea.descripcion.trim()
    }).subscribe(() => this.router.navigate(['/tareas']));
  }
}
