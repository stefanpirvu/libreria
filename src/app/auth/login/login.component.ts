import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserLogin } from '../../core/models/interfaces/userLogin';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public loginUser: FormGroup;
  public userRegisterForm: FormGroup; // Added to handle register form inline

  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    private router: Router
  ) {
    this.loginUser = this.fb.group({});
    this.userRegisterForm = this.fb.group({}); // Initialize empty form
  }

  ngOnInit(): void {
    // Initialize login form
    this.loginUser = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Pw: ['', [Validators.required]],
    });

    // Initialize register form
    this.userRegisterForm = this.fb.group({
      Nombre: ['', [Validators.required]], // Username or name
      Email: ['', [Validators.required, Validators.email]],
      Pw1: ['', [Validators.required]], // Password
      Pw2: ['', [Validators.required]], // Confirm password
      // You can add more fields as needed (e.g., Apellidos, CP, Direccion, etc.)
    }, {
      validators: this.passwordEqual('Pw1', 'Pw2') // Custom validator for password matching
    });
  }

  loginUserBtn(e: any) {
    e.preventDefault();
    if (this.validateCredentials(this.loginUser.value)) {
      this.userService.logUser(this.loginUser.value).subscribe(
        (resp) => {
          this.router.navigateByUrl('main');
        },
        (err) => {
          Swal.fire(
            'Error al iniciar sesión',
            'El usuario o la contraseña son incorrectos',
            'error'
          );
        }
      );
    }
  }

  registerUserBtn(e: any) {
    e.preventDefault();
    if (this.userRegisterForm.valid) {
      const formData = {
        ...this.userRegisterForm.value,
        PW: this.userRegisterForm.value.Pw1, // Use Pw1 as the password
      };

      console.log('Datos enviados al registrar:', formData);

      this.userService.createUser(formData).subscribe(
        (data: any) => {
          console.log('Respuesta de la API (usuario creado):', data);

          if (data?.OK) {
            this.router.navigateByUrl('/main');
            Swal.fire(
              'Registro exitoso',
              'Usuario registrado correctamente',
              'success'
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

  validateCredentials({ Email, Pw }: UserLogin) {
    if (!Email || !Pw) {
      Swal.fire(
        'Credenciales inválidas',
        'Debes introducir valores en ambos campos',
        'warning'
      );
      return false;
    }
    if (!this.loginUser.get('Email')?.valid) {
      Swal.fire(
        'Email inválido',
        'Debes introducir un email válido',
        'warning'
      );
      return false;
    }
    return true;
  }

  // Custom validator to check if passwords match
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