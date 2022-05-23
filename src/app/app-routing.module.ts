import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { ProjectComponent } from './modules/project/project.component';
import { PlataformComponent } from './modules/plataform/plataform.component';

const routes: Routes = [
 
  {path: 'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'plataform', component: PlataformComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
