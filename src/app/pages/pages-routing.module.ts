import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LibrosComponent } from './libros/libros.component';
import { TemasComponent } from './temas/temas.component';
import { AutoresComponent } from './autores/autores.component';
import { NuevoLibroComponent } from './nuevo-libro/nuevo-libro.component';
import { EdicionesComponent } from './ediciones/ediciones.component';
import { FormatosComponent } from './formatos/formatos.component';

const routes: Routes = [
  {
    path:'main', component: PagesComponent, children:[
      {path:'libros', component: LibrosComponent, data:{title:"Libros"}},
      {path:'temas', component: TemasComponent, data:{title:"Temas"}},
      {path:'autores', component:AutoresComponent, data:{title:"Autores"}},
      {path:'ediciones', component:EdicionesComponent, data:{title:"Ediciones"}},
      {path:'formatos', component:FormatosComponent, data:{title:"Formatos"}},
      {path:'nuevo-libro',component:NuevoLibroComponent, data:{title:"Nuevo Libro"}},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]

})
export class PagesRoutingModule { }
