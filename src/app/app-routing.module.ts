import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { ProjectComponent } from './modules/project/project.component';
import { PlataformComponent } from './modules/plataform/plataform.component';
import { RegisterComponent } from './modules/register/register.component';
import { VerifyComponent } from './modules/verify/verify.component';

const routes: Routes = [
 
  {path: '', redirectTo:'login',pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'plataform', component: PlataformComponent},
  {path:'register', component: RegisterComponent},
  {path:'verify/:id', component: VerifyComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
