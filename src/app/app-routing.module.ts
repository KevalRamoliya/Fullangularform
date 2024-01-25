import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { CrudComponent } from './crud/crud.component';
import { AuthGuard } from './Aguard/auth.guard';
import { FirstpageComponent } from './firstpage/firstpage.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'crud', component: CrudComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {path:'crud/fpage',component:FirstpageComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
