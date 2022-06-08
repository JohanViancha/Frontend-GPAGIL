import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/interfaces/task.interface';
import { ProjectService } from './project.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { KeyValue, ReturnMessage } from '../../interfaces/general.interface';
import { User, UserInfor } from '../../interfaces/user.interface';
import { ProjectSingle } from '../../interfaces/project.interface';
import { LoginService } from '../login/login.service';
import { AuthService } from 'src/app/core/auth.service';
import { SocketService } from '../chat/socket.service';
import { ChatService } from '../chat/chat.service';
import { SubTask } from '../../interfaces/task.interface';
import { AlertsService } from '../../core/alerts.service';
import { Project } from 'src/app/interfaces/project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  faRightFromBracket = faArrowRight
  faPlusCircle = faPlusCircle
  faTrash = faTrash

  subTasks: KeyValue[]= [];
  subTask = '';
  projectSelected: Project = {
    id_project:          0,
    name_project:        '',
    description_project: '',
    state_project:       '',
    startdate_project:   new Date(),
    enddate_project:     new Date(),
    id_user_admin:       0,
    id_user_project:     0
  };
  idProject: number = 0;
  todo: any[]= [];
  done: any[]= [];
  doing: any[] = [];
  all:any[] = [];
  usersAssignment: User[] = [];  

  nameTask:string = "";
  descriptionTask:string = "";
  assignment:number=0;
  dateEnd:Date = new Date();
  priorityTask:string = "";
  userSe: UserInfor;
  constructor(private activeRoute: ActivatedRoute,
              private serviceProject: ProjectService,
              private ChatService: ChatService,
              private alertService: AlertsService) {
                
    this.userSe = JSON.parse(localStorage.getItem('userSe')!);

  }

  ngOnInit(): void {
  
    this.activeRoute.params.subscribe(params=>{
      this.idProject = params['id'];
      this.ChatService.getMessageByProjectUser(this.idProject);
      this.serviceProject.getProjectById(this.idProject).subscribe((project:Project)=>{
        this.projectSelected = project;
      })
      this.listTasks();
    });

  }

  listTasks(){
    this.todo = [];
    this.done = [];
    this.doing = [];
    this.serviceProject.getTaskByProject(this.idProject).subscribe((response: any)=>{
    this.all = response.tasks.map((task:any)=>{
        const subtask = response.subtasks.filter((subtask:any)=> subtask.id_task === task.id_task);
        return {
          ...task,
          subtasks:subtask,  
          progress: subtask.length == 0 ? 0 :response.subtasks.reduce((progress:number, subtask:any)=> {
            if(subtask.id_task === task.id_task && subtask.state_subtask){
              progress = 1 + progress;
            }
            return progress;
          },0)* 100 /response.subtasks.filter((subtask:any)=> subtask.id_task === task.id_task).length
        }
    })

    this.all.forEach((task:Task)=>{
      switch(task.state_task){
        case '1':
          this.todo.push(task);
        break;
        case '2':
          this.doing.push(task);
        break;

        case '3':
          this.done.push(task);
        break;
      }
    })
    })
  }

  updateStateTask(idTas:number, state:string){
    this.serviceProject.updateStateTask(idTas, state).subscribe((response:ReturnMessage)=>{
      if(response.updateState){
        this.listTasks();
      }
    })
  }

  showModal(){
    this.serviceProject.getUserByProject(this.idProject).subscribe((response:User[])=>{
      this.usersAssignment = response;
    });
  }

  clearFormModal(){
    this.nameTask = '';
    this.descriptionTask = '';
    this.assignment = 0;
    this.dateEnd = new Date();
  }

  doSubTask(id:number,event:any){
     this.alertService.questionAlert('Subtarea realizada','¿Seguro que desea marca como realizada está subtarea').then(({isConfirmed})=>{
       if(isConfirmed){
         this.serviceProject.updateStateSubTask(id).subscribe((response: ReturnMessage)=>{
         })
       }
       this.listTasks();
     })
  }

  createTask(){
    this.serviceProject.createTask(this.nameTask, this.descriptionTask, 
                                  this.assignment,this.dateEnd,
                                  this.priorityTask,this.subTasks, this.idProject)
                                  .subscribe((response:ReturnMessage)=>{

      this.listTasks();
    })
    this.clearFormModal();
    this.subTasks = [];
  }

  addSubTask(){
    this.subTasks.push({'value':this.subTasks.length+1,'name':this.subTask})
    this.subTask = '';
  }

  deleteSubTask(id:number){
    this.subTasks = this.subTasks.filter(({value})=> value != id)
  }
}
