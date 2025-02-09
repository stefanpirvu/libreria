import { TemasService } from './../../services/temas.service';
import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../core/models/Recurso';
import Swal from 'sweetalert2';
import { Response } from '../../core/models/response';

@Component({
  selector: 'app-temas',
  standalone: false,

  templateUrl: './temas.component.html',
  styleUrl: './temas.component.css',
})
export class TemasComponent implements OnInit {
  temas: Recurso[] = [];
  protected nombreRecurso: string = '';
  protected articuloRecurso: string = '';
  protected pluralRecurso: string = '';

  constructor(private TemasService: TemasService) {}

  ngOnInit(): void {
    this.getTemas();
  }

  getTemas() {
    this.TemasService.getTemas().subscribe((data) => {
      this.temas = data;
    });
  }

  deleteTema(recurso: Recurso) {
    Swal.fire({
      title: 'Estás seguro de borrar el tema?',
      text: `${recurso.nombre}`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.TemasService.deleteTema(recurso.id).subscribe(
          (resp) => {
            Swal.fire('Eliminado', 'Tema eliminado con éxito', 'success');
            this.getTemas();
          },
          (resp: Response) => {
            Swal.fire('Error al eliminar el tema', resp.Error, 'error');
          }
        );
      }
    });
  }
  postTema(recurso: Recurso) {
    Swal.fire({
      title: 'Modificando ' + recurso.id + ' ' + recurso.nombre + '',
      text: '' + recurso.nombre,
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
        if (result.value == '') {
          Swal.fire('Error', 'Campo Vacio', 'error');
          return;
        }
        this.TemasService.postTema(recurso.id, result.value).subscribe(
          (resp) => {
            Swal.fire({
              title: 'Modificado Correctamente!',
              text:
                'Se ha modificado ' +
                recurso.id +
                ' ' +
                recurso.nombre +
                ' correctamente.',
              icon: 'success',
            });
            this.getTemas();
          },
          (resp: Response) => {
            Swal.fire({
              title:
                'Error al modificar ' + recurso.id + ' ' + recurso.nombre + '',
              text: resp.Error,
              icon: 'error',
            });
          }
        );
      }
    });
  }

  putTema() {
    Swal.fire({
      title: 'Agregando un nuevo ' + this.nombreRecurso + '',
      text: 'Escribe el nombre del nuevo ' + this.nombreRecurso + '',
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
        if (result.value == '') {
          Swal.fire('Error', 'Campo Vacio', 'error');
          return;
        }
        this.TemasService.putTema(result.value).subscribe(
          (resp) => {
            Swal.fire({
              title:
                'Agregado ' +
                this.articuloRecurso +
                ' ' +
                this.nombreRecurso +
                '!',
              text:
                'Se ha agregado ' +
                this.articuloRecurso +
                ' ' +
                this.nombreRecurso +
                ' correctamente.',
              icon: 'success',
            });
            this.getTemas();
          },
          (resp: Response) => {
            Swal.fire({
              title:
                'Error al agregar ' +
                this.articuloRecurso +
                ' ' +
                this.nombreRecurso +
                '',
              text: resp.Error,
              icon: 'error',
            });
          }
        );
      }
    });
  }
}
