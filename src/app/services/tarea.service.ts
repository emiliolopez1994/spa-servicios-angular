import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Tarea, TodoExterno } from '../models/tarea.model';

export type EstadoApi = 'pendiente' | 'cargando' | 'conectado' | 'error';

@Injectable({ providedIn: 'root' })
export class TareaService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private readonly tareasSubject = new BehaviorSubject<Tarea[]>([
    { id: 1, titulo: 'Diseñar Arquitectura SPA', descripcion: 'Definir rutas y servicios', completada: true, prioridad: 'Alta', origen: 'Local' },
    { id: 2, titulo: 'Integrar HttpClient', descripcion: 'Conectar con API REST y RxJS', completada: false, prioridad: 'Alta', origen: 'Local' }
  ]);
  private readonly estadoApiSubject = new BehaviorSubject<EstadoApi>('pendiente');
  private importadas = false;

  readonly estadoApi$ = this.estadoApiSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  getTareas(): Observable<Tarea[]> {
    return this.tareasSubject.asObservable();
  }

  cargarTareasRemotas(): Observable<boolean> {
    if (this.importadas) { return of(true); }
    this.estadoApiSubject.next('cargando');
    return this.http.get<TodoExterno[]>(this.apiUrl, {
      params: new HttpParams().set('_limit', '5')
    }).pipe(
      retry(1),
      map((todos) => {
        const tareasExternas: Tarea[] = todos.map((todo, index) => ({
          id: 1000 + todo.id,
          titulo: todo.title.charAt(0).toUpperCase() + todo.title.slice(1),
          descripcion: `Registro de ejemplo desde API REST · usuario ${todo.userId}`,
          completada: todo.completed,
          prioridad: (['Media', 'Baja', 'Alta'] as const)[index % 3],
          origen: 'REST'
        }));
        this.tareasSubject.next([...this.tareasSubject.value, ...tareasExternas]);
        this.importadas = true;
        this.estadoApiSubject.next('conectado');
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        this.estadoApiSubject.next('error');
        return this.manejarError(error);
      })
    );
  }

  agregarTarea(tarea: Tarea): Observable<Tarea> {
    const maximoId = this.tareasSubject.value.reduce((max, item) => Math.max(max, item.id ?? 0), 0);
    const nuevo: Tarea = { ...tarea, id: maximoId + 1, origen: 'Local' };
    this.tareasSubject.next([...this.tareasSubject.value, nuevo]);
    return of(nuevo);
  }

  eliminarTarea(id: number): Observable<boolean> {
    const siguiente = this.tareasSubject.value.filter(item => item.id !== id);
    const eliminado = siguiente.length !== this.tareasSubject.value.length;
    this.tareasSubject.next(siguiente);
    return of(eliminado);
  }

  cambiarEstado(id: number): Observable<boolean> {
    const existe = this.tareasSubject.value.some(item => item.id === id);
    if (existe) {
      this.tareasSubject.next(this.tareasSubject.value.map(item =>
        item.id === id ? { ...item, completada: !item.completada } : item
      ));
    }
    return of(existe);
  }

  private manejarError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la comunicación HTTP:', error.message);
    return throwError(() => new Error('No se pudo consultar el servicio REST. Se muestran los registros locales.'));
  }
}
