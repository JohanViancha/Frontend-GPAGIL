import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project.interface';
import { UserInfor } from 'src/app/interfaces/user.interface';
import { ProjectService } from '../../project/project.service';
import { ProjectSingle } from '../../../interfaces/project.interface';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { LoginService } from '../../login/login.service';
import { AlertsService } from '../../../core/alerts.service';
import { ChatService } from '../../chat/chat.service';
import { chatMessage } from 'src/app/interfaces/chat.interface';

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
              private serviceLogin: LoginService,
              private alertService: AlertsService,
              private serviceChat: ChatService) {

    this.userSe = this.dataLocalStorage();
  }

  ngOnInit(): void {  
    this.getProjectByUser(this.userSe.id_user!);
  }

  async getProjectByUser(id_user:number){
    console.log(id_user);
    await this.serviceProject.getProjectByUsuario(id_user).subscribe(response=>{
      console.log(response);
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
    this.showMessages(id)
  }

  async saveProject(){
    const userSelect = this.allUsers.filter((user)=>{
      if(this.assignmentUserProject.includes(user.id_user!)){
        return user;
      }
      return;
    })

    const user = JSON.parse(localStorage.getItem('userSe')!);
    await this.serviceProject.createProject(this.nameProject,this.descriptionProject,
      userSelect,this.dateEndProject, user.id_user).subscribe((res)=>{
        this.alertService.showAlert('success','Creación del proyecto', res.message)
      })
    
  }

  async createProject(){
    await this.saveProject();
    await this.getProjectByUser(this.userSe.id_user!);
    this.clearFormModal();
  }

  clearFormModal(){
    this.nameProject = '';
    this.descriptionProject = '';
    this.openModal();
    this.dateEndProject = new Date();
  }

  showMessages(idProject:number){
    this.serviceChat.getMessageByProjectUser(idProject).then((response:chatMessage[])=>{
      console.log(response);
    });
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
