import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project/project.service';
import { Project } from 'src/app/interfaces/project.interface';
import { TaskAssigment } from 'src/app/interfaces/task.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  view: [number,number] = [650, 300];
  idUser:any = 0;
  projects: Project[] = [];
  project: any = 0;
  tasksAssignment:TaskAssigment[] = []
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Prioridad';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Cantidad tareas';

  colorScheme:any = {
    domain: ['#198754', '#ffc107', '#dc3545', ]
  };

  colorSchemeTasks:any = {
    domain: ['#6c757d', '#0d6efd', '#198754', ]
  };

  single = [];
  tasks = [];
  constructor(private serviceProject: ProjectService,
    private router: Router) {
   
  }
  ngOnInit(): void {
    this.idUser = JSON.parse(localStorage.getItem('userSe')!);
    this.serviceProject.getTaskPriorityByUser(this.idUser.id_user).subscribe((data)=>{
      this.single = data;
    })

    this.serviceProject.getProjectByUsuario(this.idUser.id_user).subscribe((data)=>{
      this.projects = data;
    })

    this.serviceProject.getTaskByAssignment(this.idUser.id_user).subscribe((data:any)=>{
      console.log(data);
      this.tasksAssignment = data;
    })
  }
  
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
  }

  onDeactivate(data:any): void {
  }

  goTask(idProject:number){
    this.router.navigate(['plataform/project', idProject]);
  }

  selectProject(){
    this.serviceProject.getTaskByProject(this.project).subscribe((data)=>{
      this.tasks = data.tasks.map((task:any)=>{
        return{
          name: task.name_task,
          state: task.state_task
        }
      })
      .reduce((tasks:any, current:any)=>{
        switch(current.state){
            case '1':
              tasks[0].value = tasks[0].value+1;
            break;
            case '2':
            case '3':
              tasks[1].value = tasks[1].value+1;
            break;
            case '4':
              tasks[2].value = tasks[2].value+1;
            break;
        }
        console.log(tasks);
        return tasks;
    },[{'name':'Por hacer','value':0},{'name':'Haciendo','value':0},{'name':'Hecho', 'value':0}])

  })
  
  }
}
