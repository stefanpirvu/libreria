import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../core/models/Recurso';
import { EdicionesService } from '../../services/ediciones.service';
import Swal from 'sweetalert2';
import { Response } from '../../core/models/response';

@Component({
  selector: 'app-ediciones',
  standalone: false,

  templateUrl: './ediciones.component.html',
  styleUrl: './ediciones.component.css',
})
export class EdicionesComponent implements OnInit {
  ediciones: Recurso[] = [];
  protected nombreRecurso: string = '';
  protected articuloRecurso: string = '';
  protected pluralRecurso: string = '';

  constructor(private edicionesService: EdicionesService) {}

  ngOnInit(): void {
    this.getEdiciones();
  }

  getEdiciones() {
    this.edicionesService.getEdiciones().subscribe((data) => {
      this.ediciones = data;
    });
  }

  deleteEdicion(recurso: Recurso) {
    Swal.fire({
      title: 'Estás seguro de borrar la edición?',
      text: `${recurso.nombre}`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.edicionesService.deleteEdicion(recurso.id).subscribe(
          (resp) => {
            Swal.fire('Eliminada', 'Edición eliminada con éxito', 'success');
            this.getEdiciones();
          },
          (resp: Response) => {
            Swal.fire('Error al eliminar la edición', resp.Error, 'error');
          }
        );
      }
    });
  }
  postEdicion(recurso: Recurso) {
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
        this.edicionesService.postEdicion(recurso.id, result.value).subscribe(
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
            this.getEdiciones();
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

  putEdicion() {
    Swal.fire({
      title: 'Agregando un nuevo ' + this.nombreRecurso + '',
      text: 'Escribe el nombre de la nueva ' + this.nombreRecurso + '',
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
        this.edicionesService.putEdicion(result.value).subscribe(
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
            this.getEdiciones();
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
