import { AutoresService } from './../../services/autores.service';
import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../core/models/Recurso';

@Component({
  selector: 'app-autores',
  standalone: false,

  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent implements OnInit{

  autores:Recurso[]=[]

  constructor(private autoresService:AutoresService){

  }

  ngOnInit(): void {
    this.getAutores();
  }

  getAutores(){
    this.autoresService.getAutores().subscribe((data)=>{
      this.autores=data
    })
  }

}
