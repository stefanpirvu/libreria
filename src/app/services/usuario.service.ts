import { UserLogin } from './../core/models/interfaces/userLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../core/models/response';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private options = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: {},
  };

  private baseUrl = 'https://localhost:44301/api/';
  constructor(private httpClient: HttpClient) {}

  logUser(user: UserLogin) {
    return this.httpClient
      .post<any>(`${this.baseUrl}user/login`, { ...user }, this.options)
      .pipe(
        tap((data: Response) => {
          if (data.Error) throw data;

          sessionStorage.setItem('isLogedUser', '1');
          user = data.Data;
        })
      );
  }
}
