export class User {
  nombre: string;
  apellidos: string;
  cp: string;
  direccion: string;
  poblacion: string;
  dni: string;
  email: string;
  constructor() {}

  clear() {
    this.nombre = '';
    this.apellidos = '';
    this.cp = '';
    this.direccion = '';
    this.poblacion = '';
    this.dni = '';
    this.email = '';
  }
}
