import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/interfaces/task.interface';
import { ProjectService } from './project.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ReturnMessage } from '../../interfaces/general.interface';
import { User } from '../../interfaces/user.interface';
import { ProjectSingle } from '../../interfaces/project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  faRightFromBracket = faArrowRight
  projectSelected: ProjectSingle = {
    id_project:0,
    name_project:'',
    description_project:'',
    id_user_project: 0
  };
  idProject: number = 0;
  todo: Task[]= [];
  done: Task[]= [];
  doing: Task[] = [];
  all:Task[] = [];
  usersAssignment: User[] = [];  

  nameTask:string = "";
  descriptionTask:string = "";
  assignment:number=0;
  dateEnd:Date = new Date();

  constructor(private activeRoute: ActivatedRoute,
              private serviceProject: ProjectService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params=>{
      this.idProject = params['id'];
      this.serviceProject.selectedProject$.subscribe((project:ProjectSingle)=>{
        this.projectSelected = project;
      })
      this.listTasks();
    });

  }

  listTasks(){
    this.todo = [];
    this.done = [];
    this.doing = [];
    this.serviceProject.getTaskByProject(this.idProject).subscribe((response: Task[])=>{
    this.all = response;
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

  createTask(){
    this.serviceProject.createTask(this.nameTask, this.descriptionTask, 
                                  this.assignment,this.dateEnd,
                                  this.idProject)
                                  .subscribe((response:ReturnMessage)=>{

      this.listTasks();
    })
  }
}
