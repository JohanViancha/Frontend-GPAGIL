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
import { Storage, ref, uploadBytes, listAll,getDownloadURL, list } from '@angular/fire/storage'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  proyects: Project[] = [];
  userSe: UserInfor;
  imgPreview: string | ArrayBuffer = '';
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
              private storage: Storage) {

    this.userSe = this.dataLocalStorage();
  }

  ngOnInit(): void {  
    this.getProjectByUser(this.userSe.id_user!);

    const imageRef = ref(this.storage, 'images');
    listAll(imageRef)
    .then(async (res)=>{
      const url = res.items.filter((img:any)=>img._location.path == this.userSe.img_user)
     this.imgPreview = await getDownloadURL(url[0]);
    })
    .catch((err)=>{
      console.log(err)
    })


  }

  async getProjectByUser(id_user:number){
    await this.serviceProject.getProjectByUsuario(id_user).subscribe(response=>{
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

  async saveProject(){
    const userSelect = await this.allUsers.filter(async (user)=>{
      if(await this.assignmentUserProject.includes(user.id_user!)){
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
