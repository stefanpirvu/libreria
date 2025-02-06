import { TemasService } from './../../services/temas.service';
import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../core/models/Recurso';

@Component({
  selector: 'app-temas',
  standalone: false,

  templateUrl: './temas.component.html',
  styleUrl: './temas.component.css',
})
export class TemasComponent implements OnInit {
  temas: Recurso[] = [];

  constructor(private TemasService: TemasService) {}

  ngOnInit(): void {
    this.getTemas();
  }

  getTemas() {
    this.TemasService.getTemas().subscribe((data) => {
      this.temas = data;
    });
  }
}
