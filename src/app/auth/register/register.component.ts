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
  ) {
    this.userRegisterForm = this.fb.group({});
  }

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

  registerUser() {
    if (this.userRegisterForm.valid) {
      const formData = {
        ...this.userRegisterForm.value,
        PW: this.userRegisterForm.value.Pw1,
      };

      console.log('Datos enviados al servidor:', formData);

      this.userService.createUser(formData).subscribe(
        (data: any) => {
          console.log('Respuesta de la API (usuario creado):', data);

          if (data?.OK) {
            const dni = formData.DNI;
            formData.DNI = dni;

            this.userService.insertDataBank(formData).subscribe(
              () => {
                this.router.navigateByUrl('/main');
              },
              (err) => {
                console.error('Error al insertar los datos bancarios:', err);
                Swal.fire('Error', 'Problema al insertar datos bancarios', 'error');
              }
            );
          } else {
            Swal.fire('Error', data?.Error || 'El usuario ya existe', 'error');
          }
        },
        (error) => {
          console.error('Error en la respuesta de la API:', error);
          Swal.fire('Error desconocido', error.error?.message || 'Hubo un problema', 'error');
        }
      );
    } else {
      Swal.fire('Formulario inválido', 'Complete los campos y reintente', 'error');
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