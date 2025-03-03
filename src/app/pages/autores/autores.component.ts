import { Component, OnInit } from '@angular/core';
import { AutoresService } from '../../services/autores.service';
import { Recurso } from '../../core/models/Recurso';
import Swal from 'sweetalert2';
import { Response } from '../../core/models/response';

@Component({
  selector: 'app-autores',
  standalone: false,
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
})
export class AutoresComponent implements OnInit {
  autores: Recurso[] = [];
  autoresReal: Recurso[] = [];
  numAutoresPredetermiando = 9999999999;
  protected nombreRecurso: string = 'autor';
  protected articuloRecurso: string = 'el';
  protected pluralRecurso: string = 'autores';

  constructor(private autoresService: AutoresService) { }

  ngOnInit(): void {
    this.getAutores();
  }

  getAutores() {
    this.autoresService.getAutores().subscribe((data) => {
      this.autoresReal = [...data]; // Store the full list
      this.autores = [...data]; // Initialize the displayed list
    });
  }

  asignarPrimerosAutores(numAutores: number) {
    this.autores = [];
    this.autoresReal.forEach((v, i) => {
      if (i <= numAutores) this.autores.push(v);
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

  postAutor(recurso: Recurso) {
    Swal.fire({
      title: 'Modificando ' + recurso.id + ' ' + recurso.nombre,
      text: recurso.nombre,
      input: 'text',
      inputPlaceholder: 'Nombre',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value === '') {
          Swal.fire('Error', 'Campo Vacío', 'error');
          return;
        }
        this.autoresService.post(recurso.id, result.value).subscribe(
          (resp) => {
            Swal.fire({
              title: 'Modificado Correctamente!',
              text: `Se ha modificado ${recurso.id} ${recurso.nombre} correctamente.`,
              icon: 'success',
            });
            this.getAutores();
          },
          (resp: Response) => {
            Swal.fire({
              title: `Error al modificar ${recurso.id} ${recurso.nombre}`,
              text: resp.Error,
              icon: 'error',
            });
          }
        );
      }
    });
  }

  putAutor() {
    Swal.fire({
      title: `Agregando un nuevo ${this.nombreRecurso}`,
      text: `Escribe el nombre del nuevo ${this.nombreRecurso}`,
      input: 'text',
      inputPlaceholder: 'Nombre',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value === '') {
          Swal.fire('Error', 'Campo Vacío', 'error');
          return;
        }
        this.autoresService.put(result.value).subscribe(
          (resp) => {
            Swal.fire({
              title: `Agregado ${this.articuloRecurso} ${this.nombreRecurso}!`,
              text: `Se ha agregado ${this.articuloRecurso} ${this.nombreRecurso} correctamente.`,
              icon: 'success',
            });
            this.getAutores();
          },
          (resp: Response) => {
            Swal.fire({
              title: `Error al agregar ${this.articuloRecurso} ${this.nombreRecurso}`,
              text: resp.Error,
              icon: 'error',
            });
          }
        );
      }
    });
  }

  filterAutores(e: Recurso[]) {
    if (e.length === 0) {
      this.asignarPrimerosAutores(this.numAutoresPredetermiando);
    } else {
      this.autores = e;
    }
  }
}