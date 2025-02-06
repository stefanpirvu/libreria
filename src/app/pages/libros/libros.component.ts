import { Libro } from './../../core/models/libro';
import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-libros',
  standalone: false,

  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit{

  libros:Libro[]=[]
  private baseUrl="https://localhost:44301/api/"

  constructor(private LibroService:LibrosService){
  }

  ngOnInit(): void {
    this.LibroService.getLibro().subscribe((libro:Libro[])=>{
      this.libros=libro
    })
  }
  getImage(imgName:string){
    return this.baseUrl+"uploads/img?imageName="+imgName;
  }
}
