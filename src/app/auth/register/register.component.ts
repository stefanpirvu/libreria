import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.userRegisterForm = this.fb.group(
      {
        Nombre: ['Pinocho', [Validators.required]],
        Apellidos: ['Madera', [Validators.required]],
        CP: ['12345', [Validators.required]],
        Direccion: ['C/', [Validators.required]],
        Poblacion: ['ad', [Validators.required]],
        DNI: ['123123122', [Validators.required]],
        Email: ['dwada@gmail.com', [Validators.required, Validators.email]],
        Pw1: ['1234', [Validators.required]],
        Pw2: ['1234', [Validators.required]],
        NombreTitular: ['Pinocho', [Validators.required]],
        NumberCard: ['123', [Validators.required]],
        CVV: ['123', [Validators.required]],
      },
      {
        validators: this.passwordEqual('Pw1', 'Pw2'),
      }
    );
  }

  loginUserBtn() {
    this.router.navigateByUrl('login');
  }

  registerUser() {
    if (this.userRegisterForm.valid) {
      const formData = this.userRegisterForm.value;
      console.log('Datos enviados al servidor:', formData); // Agrega esto para verificar los datos

      this.userService.createUser(formData).subscribe(
        (data: any) => {
          console.log('Respuesta de la API:', data);
          if (data?.OK) {
            this.userService.insertDataBank(formData).subscribe(
              () => {
                this.router.navigateByUrl('/main');
              },
              (err) => {
                console.error('Error al insertar los datos bancarios:', err);
                Swal.fire(
                  'Error interno',
                  'Ha ocurrido un error al insertar los datos bancarios',
                  'error'
                );
              }
            );
          } else {
            Swal.fire(
              'Error',
              'El usuario ya existe o hubo un problema',
              'error'
            );
          }
        },
        (error) => {
          if (error.error) {
            console.error('Error detallado:', error.error);
            Swal.fire(
              'Error al registrar usuario',
              `Hubo un problema: ${error.error.message || error.error}`,
              'error'
            );
          } else {
            console.error('Error desconocido:', error);
            Swal.fire(
              'Error desconocido',
              'Hubo un problema al conectar con el servidor',
              'error'
            );
          }
        }
      );
    } else {
      Swal.fire(
        'Formulario inválido',
        'Complete el formulario y vuelva a intentarlo',
        'error'
      );
    }
  }


  isInvalid(item: string) {
    return this.userRegisterForm.get(item)?.invalid;
  }

  passwordEqual(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const Pw1 = formGroup.get(pass1);
      const Pw2 = formGroup.get(pass2);

      if (!Pw1 || !Pw2) return;

      if (Pw1.value !== Pw2.value) {
        Pw2.setErrors({ noEsIgual: true });
      } else {
        Pw2.setErrors(null);
      }
    };
  }
}
