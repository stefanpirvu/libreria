import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recurso } from '../core/models/Recurso';
import { map } from 'rxjs';
import { Response } from '../core/models/response';

@Injectable({
  providedIn: 'root',
})
export class TemasService {
  private options = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: {},
  };

  private baseUrl = 'https://localhost:44301/api/';
  protected recursoDir = '';
  constructor(private httpClient: HttpClient) {}

  public getTemas() {
    return this.httpClient.get<Recurso[]>(
      `${this.baseUrl}tema/temas-controller`,
      this.options
    );
  }

  public deleteTema(id: number) {
      this.options.body = { Id: id };
      return this.httpClient
        .delete<Response>(`${this.baseUrl}tema/temas-controller`, this.options)
        .pipe(
          map((resp) => {
            if (resp.Error) throw resp;
            return resp;
          })
        );
    }

    public postTema(id: number, nombre: string) {
      const body = {
        id: id,
        nombre: nombre,
      };
      console.log(this.options.body);
      return this.httpClient
        .post<Response>(
          `${this.baseUrl}tema/temas-controller`,
          body,
          this.options
        )
        .pipe(
          map((resp) => {
            if (resp.Error) throw resp;
            return resp;
          })
        );
    }

    public putTema(nombre: string) {
      const body = {
        nombre: nombre,
      };
      console.log(this.options.body);
      return this.httpClient
        .put<any>(`${this.baseUrl}tema/temas-controller`, body, this.options)
        .pipe(
          map((resp: Response) => {
            if (resp.Error) throw resp;
            return resp.Data;
          })
        );
    }
}
