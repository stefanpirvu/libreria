import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../core/models/Recurso';
import { FormatosService } from '../../services/formatos.service';

@Component({
  selector: 'app-formatos',
  standalone: false,

  templateUrl: './formatos.component.html',
  styleUrl: './formatos.component.css',
})
export class FormatosComponent implements OnInit {
  formatos: Recurso[] = [];

  constructor(private formatosService: FormatosService) {}

  ngOnInit(): void {
    this.getFormatos();
  }

  getFormatos() {
    this.formatosService.getFormatos().subscribe((data) => {
      this.formatos = data;
    });
  }
}
