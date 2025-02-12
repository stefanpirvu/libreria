import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesNotFoundComponent } from './pages-not-found/pages-not-found.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth.routing';
import { LoginModule } from './auth/login.module';

const routes: Routes = [
  {path:'',redirectTo:'/main',pathMatch:'full'},
  {path:'**', component:PagesNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    LoginModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
