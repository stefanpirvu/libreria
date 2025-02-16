import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recurso } from '../../core/models/Recurso';

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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToMain() {
    this.router.navigateByUrl('/');
  }
}
