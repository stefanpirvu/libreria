import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AutoresComponent } from './autores/autores.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPagesComponent } from './main-pages.component';
import { LibrosComponent } from './libros/libros.component';
import { TemasComponent } from './temas/temas.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { NuevoLibroComponent } from './nuevo-libro/nuevo-libro.component'

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormatosComponent } from './formatos/formatos.component';
import { EdicionesComponent } from './ediciones/ediciones.component';

@NgModule({
  declarations: [
    MainPagesComponent,
    LibrosComponent,
    TemasComponent,
    AutoresComponent,
    PagesComponent,
    NuevoLibroComponent,
    FormatosComponent,
    EdicionesComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    CardModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule
],
  exports:[ ]
})
export class PagesModule { }
