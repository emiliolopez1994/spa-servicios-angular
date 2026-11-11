import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tarea } from '../../models/tarea.model';
import { EstadoApi, TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-tarea-lista',
  standalone: false,
  templateUrl: './tarea-lista.component.html',
  styleUrls: ['./tarea-lista.component.css']
})
export class TareaListaComponent implements OnInit {
  readonly tareas$: Observable<Tarea[]>;
  readonly estadoApi$: Observable<EstadoApi>;
  readonly tareasFiltradas$: Observable<Tarea[]>;
  readonly resumen$: Observable<{ total: number; completas: number; pendientes: number; altas: number }>;
  private readonly filtroSubject = new BehaviorSubject<string>('');
  filtro = '';
  mensajeError = '';

  constructor(private readonly tareaService: TareaService) {
    this.tareas$ = this.tareaService.getTareas();
    this.estadoApi$ = this.tareaService.estadoApi$;
    this.tareasFiltradas$ = combineLatest([this.tareas$, this.filtroSubject]).pipe(
      map(([tareas, filtro]) => {
        const termino = filtro.trim().toLocaleLowerCase();
        return tareas.filter(t => `${t.titulo} ${t.descripcion} ${t.prioridad}`.toLocaleLowerCase().includes(termino));
      })
    );
    this.resumen$ = this.tareas$.pipe(map(tareas => ({
      total: tareas.length,
      completas: tareas.filter(t => t.completada).length,
      pendientes: tareas.filter(t => !t.completada).length,
      altas: tareas.filter(t => t.prioridad === 'Alta').length
    })));
  }

  ngOnInit(): void {
    this.actualizarDesdeApi();
  }

  actualizarDesdeApi(): void {
    this.mensajeError = '';
    this.tareaService.cargarTareasRemotas().subscribe({
      error: error => this.mensajeError = error.message
    });
  }

  buscar(): void {
    this.filtroSubject.next(this.filtro);
  }

  eliminar(id?: number): void {
    if (id === undefined) { return; }
    this.tareaService.eliminarTarea(id).subscribe();
  }

  cambiarEstado(id?: number): void {
    if (id === undefined) { return; }
    this.tareaService.cambiarEstado(id).subscribe();
  }

  identificar(_index: number, tarea: Tarea): number | undefined {
    return tarea.id;
  }
}
