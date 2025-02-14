export class User {
  id: number;
  nombre: string;
  apellidos: string;
  cp: string;
  direccion: string;
  poblacion: string;
  dni: string;
  email: string;
  constructor() {}

  clear() {
    this.id = 0;
    this.nombre = '';
    this.apellidos = '';
    this.cp = '';
    this.direccion = '';
    this.poblacion = '';
    this.dni = '';
    this.email = '';
  }
}
