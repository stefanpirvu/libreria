import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recurso } from '../core/models/Recurso';

@Injectable({
  providedIn: 'root'
})
export class FormatosService {

 private options={
       headers:{
         'Content-Type':'application/json'
       }
     }

     private baseUrl="https://localhost:44301/api/"
     constructor(private httpClient:HttpClient) {
     }

     public getFormatos(){
       return this.httpClient.get<Recurso[]>(`${this.baseUrl}formato/formatos-controller`,this.options)
     }
}
