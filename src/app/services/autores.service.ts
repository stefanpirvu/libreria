import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recurso } from '../core/models/Recurso';
import { map } from 'rxjs';
import { Response } from '../core/models/response';

@Injectable({
  providedIn: 'root',
})
export class AutoresService {
  private options = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: {},
  };

  private baseUrl = 'https://localhost:44301/api/';
  constructor(private httpClient: HttpClient) {}

  public getAutores() {
    return this.httpClient.get<Recurso[]>(
      `${this.baseUrl}autor/autores-controller`,
      this.options
    );
  }

  public deleteAutor(id: number) {
    this.options.body = { Id: id };
    return this.httpClient.delete<Response>(
      `${this.baseUrl}autor/autores-controller`,
      this.options
    ).pipe(map(
      (resp)=>{
        if(resp.Error) throw resp
        return resp
      }
    ));
  }
}
