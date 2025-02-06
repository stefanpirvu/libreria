import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../core/models/libro';
import { map } from 'rxjs';
import { Response } from '../core/models/response';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private options={
    headers:{
      'Content-Type':'application/json'
    }
  }

  private baseUrl="https://localhost:44301/api/"
  constructor(private httpClient:HttpClient) {
  }

  public getLibro(){
    return this.httpClient.get<Libro[]>(`${this.baseUrl}libro/libros-controller`,this.options)
  }

  public putLibro(libro:Libro){
    const body={
      nombre:libro.nombre,
      autor:libro.autor,
      edicion:libro.edicion,
      formato:libro.formato,
      tema:libro.tema,
      precio:libro.precio,
      isbn:libro.isbn,
      cantidad:libro.cantidad,
      imgname:libro.imgname
    }
    return this.httpClient.put<any>(`${this.baseUrl}libro/libros-controller`,{...libro},this.options).pipe(
      map((response:Response)=>{
        if(response.Error) throw response
        return response.Data
      }))
  }
}
