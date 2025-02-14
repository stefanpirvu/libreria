import { User } from './../core/models/user';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Response } from "../core/models/response";
import { UserLogin } from '../core/models/interfaces/userLogin';

@Injectable({
  providedIn:'root'
})
export class UsuarioService{
  private options={
    headers:{
      'Content-Type':'application/json'
    },
    body:{},
  };
  private baseUrl="https://localhost:44301/api/";

  constructor(private http:HttpClient){
  }

  logUser(user:UserLogin){
    return this.http.post<any>(`${this.baseUrl}user/login`, {...user}, this.options)
    .pipe(
      tap((data:Response)=>{
        if (data.Error) throw data;

        sessionStorage.setItem('isLogedUser','1');
        user=data.Data;

        return data;
      })
    )
  }

  createUser(user:any){
    return this.http
    .post<any>(`${this.baseUrl}user/crete-user`,{...user},this.options)
    .pipe(
      tap((data:Response)=>{
        if(data.Error) throw data;

        sessionStorage.setItem('isLogedUser','1')
        user=data.Data
        sessionStorage.setItem('userId',`${data.Data}`)

        return data;
      })
    )
  }
}
