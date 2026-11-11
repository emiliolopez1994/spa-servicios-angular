import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareaListaComponent } from './components/tarea-lista/tarea-lista.component';
import { TareaFormComponent } from './components/tarea-form/tarea-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/tareas', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tareas', component: TareaListaComponent, canActivate: [AuthGuard] },
  { path: 'nueva-tarea', component: TareaFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/tareas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
