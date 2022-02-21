import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfessoresComponent } from './professores/professores.component';
import { TurmasComponent } from './turmas/turmas.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { InicialComponent } from './inicial/inicial.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { SalasComponent } from './salas/salas.component';
import { TituloComponent } from './titulo/titulo.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HeaderComponent,
    ProfessoresComponent,
    TurmasComponent,
    DisciplinasComponent,
    InicialComponent,
    CalendarioComponent,
    SalasComponent,
    TituloComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
