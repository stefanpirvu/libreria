import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recurso } from '../core/models/Recurso';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private options={
    headers:{
      'Content-Type':'application/json'
    }
  }

  private baseUrl="https://localhost:44301/api/"
  constructor() { }

  public updatePhoto(file:File){
    const url=`${this.baseUrl}uploads/img`;
    const formData=new FormData();
    formData.append('imagen',file);
    return new Promise<string>((resolve,reject)=>{
      fetch(url,{
        method:'PUT',
        body:formData,
      })
      .then(async(data:any)=>{
        data=await data.json();
        resolve(data.fileName);
      })
      .catch((err)=>{
        console.log(err);
        reject(err.error.error);
      });
    });
  }

}
