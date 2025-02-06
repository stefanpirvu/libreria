import { AutoresService } from './../../services/autores.service';
import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../core/models/Recurso';
import Swal from 'sweetalert2';
import { Response } from '../../core/models/response';

@Component({
  selector: 'app-autores',
  standalone: false,

  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css',
})
export class AutoresComponent implements OnInit {
  autores: Recurso[] = [];

  constructor(private autoresService: AutoresService) {}

  ngOnInit(): void {
    this.getAutores();
  }

  getAutores() {
    this.autoresService.getAutores().subscribe((data) => {
      this.autores = data;
    });
  }

  deleteAutor(recurso: Recurso) {
    Swal.fire({
      title: 'Estás seguro de borrar al autor?',
      text: `${recurso.nombre}`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.autoresService.deleteAutor(recurso.id).subscribe(
          (resp) => {
            Swal.fire('Eliminado', 'Autor eliminado con éxito', 'success');
            this.getAutores();
          },
          (resp: Response) => {
            Swal.fire('Error al eliminar al autor', resp.Error, 'error');
          }
        );
      }
    });
  }
}
