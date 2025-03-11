import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barra-cierre',
  standalone: false,
  templateUrl: './barra-cierre.component.html',
  styleUrls: ['./barra-cierre.component.css'],
})
export class BarraCierreComponent<T> implements OnInit {
  @Input() dataReal: T[] = [];
  @Input() dataTemp: T[] = [];
  @Output() dataEmit: EventEmitter<T[]> = new EventEmitter<T[]>();

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToMain() {
    this.router.navigateByUrl('/');
  }

  searchRecurso(e: string) {
    const searchTerm = e.trim().toLowerCase();
    let filteredData: T[] = [];

    if (searchTerm.length >= 2) {
      filteredData = this.dataReal.filter((item: T) =>
        // Assume items have a 'nombre' property; adjust if needed
        (item as any).nombre.toLowerCase().includes(searchTerm)
      );
      if (filteredData.length === 0) {
        Swal.fire(
          'Warning',
          `No existen elementos que coincidan con la búsqueda`,
          'info'
        );
      }
    } else {
      filteredData = [...this.dataReal]; // Reset to full list when search term is too short
    }

    this.dataEmit.emit(filteredData);
  }
}