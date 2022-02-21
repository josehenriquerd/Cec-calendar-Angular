import { SalasComponent } from './salas/salas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { InicialComponent } from './inicial/inicial.component';
import { TurmasComponent } from './turmas/turmas.component';
import { ProfessoresComponent } from './professores/professores.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'inicial', pathMatch: 'full' },
  { path: 'professores', component: ProfessoresComponent },
  { path: 'turmas', component: TurmasComponent },
  { path: 'inicial', component: InicialComponent },
  { path: 'disciplinas', component: DisciplinasComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'salas', component: SalasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
