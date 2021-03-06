import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from '../project/project.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { PlataformComponent } from './plataform.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProfileComponent } from '../profile/profile.component';


const routes: Routes = [
  {path:'plataform', component: PlataformComponent,
    children:[
      {path:'project/:id', component: ProjectComponent},
      {path:'dashboard', component: DashboardComponent},
      {path:'profile', component: ProfileComponent}
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlataformRoutingModule { }
