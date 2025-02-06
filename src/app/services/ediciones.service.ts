import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recurso } from '../core/models/Recurso';

@Injectable({
  providedIn: 'root'
})
export class EdicionesService {

  private options={
    headers:{
      'Content-Type':'application/json'
    }
  }

  private baseUrl="https://localhost:44301/api/"
  constructor(private httpClient:HttpClient) {
  }

  public getEdiciones(){
    return this.httpClient.get<Recurso[]>(`${this.baseUrl}edicion/ediciones-controller`,this.options)
  }
}
