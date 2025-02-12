import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.loginUser = this.fb.group(0);
  }
  ngOnInit(): void {
    this.loginUser = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Pw: ['', [Validators.required]],
    });
  }

  loginUserBtn(e: any) {
    e.preventDefault();
    if (this.loginUser.valid) {
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
}
