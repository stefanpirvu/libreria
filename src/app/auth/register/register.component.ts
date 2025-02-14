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
        DNI: ['12345678H', [Validators.required]],
        Email: ['dwada@gmail.com', [Validators.required, Validators.email]],
        Pw1: ['1234', [Validators.required]],
        Pw2: ['1234', [Validators.required]],
        NombreTitular: ['Pinocho', [Validators.required]],
        NumberCard: ['12313123123123123', [Validators.required]],
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
      this.userService.createUser(this.userRegisterForm.value).subscribe(
        () => {},
        (error) => {
          console.error('Error al registrar usuario:', error);
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
    return this.userRegisterForm.get(item).valid;
  }

  passwordEqual(pass1: string, pass2: string) {
    return (formGrup: FormGroup) => {
      const Pw1 = formGrup.get(pass1);
      const Pw2 = formGrup.get(pass2);

      if (Pw1.value === Pw2.value) {
        Pw1.setErrors(null);
        Pw2.setErrors(null);
      } else {
        Pw1.setErrors({ noEslgual: true });
        Pw2.setErrors({ noEsigual: true });
      }
    };
  }
}
