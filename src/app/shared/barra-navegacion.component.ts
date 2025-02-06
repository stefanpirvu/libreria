import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-barra-navegacion',
  standalone: false,

  templateUrl: './barra-navegacion.component.html',
  styleUrl: './barra-navegacion.component.css'
})
export class BarraNavegacionComponent implements OnInit{
  navBar:MenuItem[]=[]

  constructor(private router:Router){
  }

  ngOnInit(): void {
    this.navBar=
    [{
      label:"Libros",
      icon:'assets/Iconos/libros.png',
      command:()=>{this.router.navigateByUrl('main/libros')}
    },
    {
      label:"Autores",
      icon:"assets/Iconos/autores.png",
      command:()=>{this.router.navigateByUrl("main/autores")}
    },
    {
      label:"Temas",
      icon:"assets/Iconos/temas.png",
      command:()=>{this.router.navigateByUrl("main/temas")}
    },
    {
      label:"Ediciones",
      icon:"assets/Iconos/ediciones.png",
      command:()=>{this.router.navigateByUrl("main/ediciones")}
    },
    {
      label:"Formatos",
      icon:"assets/Iconos/formatos.png",
      command:()=>{this.router.navigateByUrl("main/formatos")}
    }
    ]
  }
}
