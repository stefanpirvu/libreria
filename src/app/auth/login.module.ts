import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth.routing';
import { ButtonModule } from 'primeng/button';
import { InputTextModule} from 'primeng/inputtext';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, AuthRoutingModule, ButtonModule, InputTextModule
  ]
})
export class LoginModule { }
