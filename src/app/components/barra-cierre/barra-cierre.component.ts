import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recurso } from '../../core/models/Recurso';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barra-cierre',
  standalone: false,

  templateUrl: './barra-cierre.component.html',
  styleUrl: './barra-cierre.component.css',
})
export class BarraCierreComponent implements OnInit {
  @Input() dataReal: Recurso[] = [];
  @Input() dataTemp: Recurso[] = [];
  @Output() dataEmit: EventEmitter<Recurso[]> = new EventEmitter<Recurso[]>();
  @Input() isVisible: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToMain() {
    this.router.navigateByUrl('/');
  }

  searchRecurso(e: any) {
    this.dataTemp = [];
    if (e.length >= 2) {
      this.dataTemp = this.dataReal.filter((autor: Recurso) =>
        autor.nombre.toLowerCase().match(e.toLowerCase())
      );
      if (this.dataTemp.length === 0) {
        Swal.fire(
          'Warning',
          'No existen autores que coincidan con la búsqueda',
          'info'
        );
      }
      this.dataEmit.emit(this.dataTemp);
    } else {
      this.dataEmit.emit(this.dataTemp);
    }
  }
}
