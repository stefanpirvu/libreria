import { Autor } from './../../core/models/autor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recurso } from '../../core/models/Recurso';
import { Libro } from '../../core/models/libro';
import { AutoresService } from '../../services/autores.service';
import { EdicionesService } from '../../services/ediciones.service';
import { FormatosService } from '../../services/formatos.service';
import { TemasService } from '../../services/temas.service';
import Swal from 'sweetalert2';
import { LibrosService } from '../../services/libros.service';
import { FileUploadService } from '../../services/flie.upload.service';

@Component({
  selector: 'app-nuevo-libro',
  standalone: false,

  templateUrl: './nuevo-libro.component.html',
  styleUrl: './nuevo-libro.component.css'
})
export class NuevoLibroComponent implements OnInit{

  libroFormulario:FormGroup

  pulsadoBtnGuardar: boolean=false

  autores:Recurso[]=[]
  tema:Recurso[]=[]
  edicion:Recurso[]=[]
  formato:Recurso[]=[]

  libro:Libro=new Libro()

  public imgUpload:File|any;
  public imgTemp:string|ArrayBuffer|any=null

  constructor(private fb:FormBuilder, private autoresService:AutoresService, private edicionesService:EdicionesService,
    private formatosService:FormatosService, private temasService:TemasService, private librosService:LibrosService,
    private uploadService:FileUploadService){
    this.libroFormulario=this.fb.group({})
  }

  ngOnInit(): void {
    this.getDataRecursos();
    this.libroFormulario=this.fb.group(
      {nombre:['', Validators.required],
      isbn: ['', [Validators.required, Validators.minLength(13)]],
      precio: [0, Validators.required],
      cantidad: [0, Validators.required],
      autor: ['', Validators.required],
      tema: ['', Validators.required],
      edicion: ['', Validators.required],
      formato: ['', Validators.required],
    })
  }

  isValidField(key: string) {
    return this.libroFormulario.get(key)?.invalid && this.pulsadoBtnGuardar
    }

  saveBook(){
    if (!this.libroFormulario.valid) {
      this.pulsadoBtnGuardar=true
      Swal.fire("Error",
        "Los campos no cumplen los requisitos",
        "error")
    }else{
      this.libro.nombre=this.libroFormulario.value.nombre;
      this.libro.autor=this.libroFormulario.value.autor.id;
      this.libro.edicion=this.libroFormulario.value.edicion.id;
      this.libro.formato=this.libroFormulario.value.formato.id;
      this.libro.tema=this.libroFormulario.value.tema.id;
      this.libro.precio=this.libroFormulario.value.precio;
      this.libro.isbn=this.libroFormulario.value.isbn;
      this.libro.cantidad=this.libroFormulario.value.cantidad;

      this.librosService.putLibro(this.libro).subscribe(
        (res)=>{
          if (this.imgUpload) {
            this.uploadService.updatePhoto(this.imgUpload).then(()=>{
                Swal.fire(
                  'Exito',
                  'Libro añadido con exito - imagen',
                  'success'
                )
            })
          }else{
            Swal.fire(
              'Exito',
              'Libro añadido con exito - sin imagen',
              'success'
            )
          }
        },
        (err)=>{
          Swal.fire(
            'Error',
            err.Error,
            'error'
          )
        }
      )
    }
  }

  changeImg(event:any){
    let file=event.target.files[0]
    this.imgUpload=file
    this.libro.imgname=this.imgUpload.name
    if (file) {
      this.imgTemp=null
      return;
    }
    const reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend=()=>{
      console.log();
      this.imgTemp=reader.result
    }
  }

  getDataRecursos(){
    this.autoresService.getAutores().subscribe((data)=>{
      this.autores=data
      this.temasService.getTemas().subscribe((data)=>{
        this.tema=data
        this.edicionesService.getEdiciones().subscribe((data)=>{
          this.edicion=data
          this.formatosService.getFormatos().subscribe((data)=>{
            this.formato=data
          })
        })
      })
    })
  }

}
