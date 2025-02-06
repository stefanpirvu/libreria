export class Libro{
  id:number;
  nombre:string;
  autor:string;
  edicion:string;
  formato:string;
  tema:string;
  precio:number;
  isbn:string;
  cantidad:number;
  imgname: string;

  constructor(){
    this.id=0;
    this.nombre="";
    this.autor="";
    this.edicion="";
    this.formato="";
    this.tema="";
    this.precio=0;
    this.isbn="";
    this.cantidad=0;
    this.imgname="s"
  }
}
