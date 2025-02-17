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

  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    private router: Router
  ) {
    this.loginUser = this.fb.group({});
  }
  ngOnInit(): void {
    this.loginUser = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Pw: ['', [Validators.required]],
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

  // loginUserBtn(e: any) {
  //   const user: UserLogin = this.loginUser.value;
  //   if (this.validateCredentials(user)) {
  //     this.userService.logUser(user).subscribe(
  //       (resp) => {
  //         this.router.navigateByUrl('main');
  //       },
  //       (err) => {
  //         Swal.fire(
  //           'Error al iniciar sesión',
  //           'El usuario o la contraseña son incorrectos',
  //           'error'
  //         );
  //       }
  //     );
  //   }
  // }

  registerUserBtn(e: any) {
    this.router.navigateByUrl('register');
  }

  validateCredentials({ Email, Pw }: UserLogin) {
    if (!Email || !Pw) {
      Swal.fire(
        'Credenciales invalidas',
        'Debes introducir valores en ambos campos',
        'warning'
      );
      return false;
    }
    if (!this.loginUser.get('Email').valid) {
      Swal.fire(
        'Email invalido',
        'Debes introducir un email valido',
        'warning'
      );
      return false;
    }
    return true;
  }
}
