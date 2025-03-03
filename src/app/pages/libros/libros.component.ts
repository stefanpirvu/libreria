import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../core/models/libro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libros',
  standalone: false,
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  libros: Libro[] = [];
  librosReal: Libro[] = [];
  private baseUrl = "https://localhost:44301/api/";

  constructor(private libroService: LibrosService) { }

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros() {
    this.libroService.getLibro().subscribe((libros: Libro[]) => {
      this.libros = libros;
      this.librosReal = [...libros];
    });
  }

  getImage(imgName: string) {
    return `${this.baseUrl}uploads/img?imageName=${imgName}`;
  }

  filterLibros(filteredLibros: Libro[]) {
    if (filteredLibros.length === 0) {
      this.libros = [...this.librosReal];
    } else {
      this.libros = filteredLibros;
    }
  }
}