import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { UserInfor } from 'src/app/interfaces/user.interface';
import { ProjectService } from '../../project/project.service';
import { ProjectSingle } from '../../../interfaces/project.interface';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  proyects: Project[] = [];
  userSe: UserInfor;
  faPlusCircle = faPlusCircle
  faExclamationCircle = faExclamationCircle
  nameProject:string = "";
  descriptionProject:string = "";
  assignmentUserProject:number[]=[]
  allUsers:UserInfor[] = [];
  dateEndProject:Date = new Date();

  constructor(private router: Router,
              private serviceProject: ProjectService,
              private serviceLogin: LoginService) {

    this.userSe = this.dataLocalStorage();
  }

  ngOnInit(): void {
    const {id_user} = JSON.parse(localStorage.getItem('userSe') || '{}');   
    this.serviceProject.getProjectByUsuario(id_user).subscribe(response=>{
    this.proyects = response;
    })
  }

  openModal(){
    this.serviceLogin.mostrar().subscribe((users:UserInfor[])=>{
      this.allUsers = users;
    });
  }
  searchTaks(id:number,name:string, description:string,id_user_project:number){
    const projectSingle: ProjectSingle = {
      id_project:id,
      name_project:name, 
      description_project: description,
      id_user_project: id_user_project

    }
    this.serviceProject.setProject(projectSingle);
    this.router.navigate(['plataform/project', id]);
  }


  createProject(){
    this.serviceProject.createProject(this.nameProject,this.descriptionProject,
      this.assignmentUserProject,this.dateEndProject, 10).subscribe((res)=>{
        console.log(res);
      })
  }


  dataLocalStorage(): UserInfor {
    if (localStorage.length == 0) {
        this.router.navigate(['/login'])
    }
    return JSON.parse(localStorage.getItem('userSe')!);

  }

  exitSesion(){
    this.router.navigate(['/login']);
    localStorage.clear();
  }


}
