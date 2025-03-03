import { Component, OnInit } from '@angular/core';
import { TemasService } from '../../services/temas.service';
import { Recurso } from '../../core/models/Recurso';
import Swal from 'sweetalert2';
import { Response } from '../../core/models/response';

@Component({
  selector: 'app-temas',
  standalone: false,
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css'],
})
export class TemasComponent implements OnInit {
  temas: Recurso[] = [];
  temasReal: Recurso[] = []; // Store the full list for filtering
  protected nombreRecurso: string = 'tema';
  protected articuloRecurso: string = 'el';
  protected pluralRecurso: string = 'temas';

  constructor(private temasService: TemasService) { }

  ngOnInit(): void {
    this.getTemas();
  }

  getTemas() {
    this.temasService.getTemas().subscribe((data) => {
      this.temasReal = [...data]; // Store the full list
      this.temas = [...data]; // Initialize the displayed list
    });
  }

  deleteTema(recurso: Recurso) {
    Swal.fire({
      title: 'Estás seguro de borrar el tema?',
      text: `${recurso.nombre}`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.temasService.deleteTema(recurso.id).subscribe(
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
      title: `Modificando ${recurso.id} ${recurso.nombre}`,
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
        this.temasService.postTema(recurso.id, result.value).subscribe(
          (resp) => {
            Swal.fire({
              title: 'Modificado Correctamente!',
              text: `Se ha modificado ${recurso.id} ${recurso.nombre} correctamente.`,
              icon: 'success',
            });
            this.getTemas();
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

  putTema() {
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
        this.temasService.putTema(result.value).subscribe(
          (resp) => {
            Swal.fire({
              title: `Agregado ${this.articuloRecurso} ${this.nombreRecurso}!`,
              text: `Se ha agregado ${this.articuloRecurso} ${this.nombreRecurso} correctamente.`,
              icon: 'success',
            });
            this.getTemas();
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

  filterTemas(filteredTemas: Recurso[]) {
    if (filteredTemas.length === 0) {
      this.temas = [...this.temasReal]; // Reset to full list if no results
    } else {
      this.temas = filteredTemas; // Update with filtered results
    }
  }
}