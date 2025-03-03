import { FormatosService } from './../../services/formatos.service';
import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../core/models/Recurso';
import Swal from 'sweetalert2';
import { Response } from '../../core/models/response';

@Component({
  selector: 'app-formatos',
  standalone: false,

  templateUrl: './formatos.component.html',
  styleUrl: './formatos.component.css',
})
export class FormatosComponent implements OnInit {
  formatos: Recurso[] = [];
  formatoReal: Recurso[] = [];
  numFormatosPredetermiando = 9999999999;
  protected nombreRecurso: string = '';
  protected articuloRecurso: string = '';
  protected pluralRecurso: string = '';

  constructor(private formatosService: FormatosService) { }

  ngOnInit(): void {
    this.getFormatos();
  }

  getFormatos() {
    this.formatosService.getFormatos().subscribe((data) => {
      this.formatos = data; // Displayed list
      this.formatoReal = [...data]; // Full list for filtering
    });
  }

  // Remove if not used
  asignarPrimerosFormatos(numAutores: number) {
    this.formatos = [];
    this.formatoReal.forEach((v, i) => {
      if (i <= numAutores) this.formatos.push(v);
    });
  }

  deleteFormato(recurso: Recurso) {
    Swal.fire({
      title: 'Estás seguro de borrar el formato?',
      text: `${recurso.nombre}`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.formatosService.deleteFormatos(recurso.id).subscribe(
          (resp) => {
            Swal.fire('Eliminado', 'Formato eliminado con éxito', 'success');
            this.getFormatos();
          },
          (resp: Response) => {
            Swal.fire('Error al eliminar el formato', resp.Error, 'error');
          }
        );
      }
    });
  }
  postFormato(recurso: Recurso) {
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
        this.formatosService.postFormato(recurso.id, result.value).subscribe(
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
            this.getFormatos();
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

  putFormato() {
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
        this.formatosService.putFormato(result.value).subscribe(
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
            this.getFormatos();
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

  filterFormato(e: Recurso[]) {
    this.formatos = [...e]; // Update displayed formatos with filtered list
  }
}
