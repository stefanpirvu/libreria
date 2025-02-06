import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../core/models/Recurso';
import { EdicionesService } from '../../services/ediciones.service';

@Component({
  selector: 'app-ediciones',
  standalone: false,

  templateUrl: './ediciones.component.html',
  styleUrl: './ediciones.component.css',
})
export class EdicionesComponent implements OnInit {
  ediciones: Recurso[] = [];

  constructor(private edicionesService: EdicionesService) {}

  ngOnInit(): void {
    this.getEdiciones();
  }

  getEdiciones() {
    this.edicionesService.getEdiciones().subscribe((data) => {
      this.ediciones = data;
    });
  }
}
