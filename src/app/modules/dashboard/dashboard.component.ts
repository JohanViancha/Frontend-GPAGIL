import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  view: [number,number] = [1300, 400];
  

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

  single = [];

  
  constructor(private serviceProject: ProjectService) {
   
  }
  ngOnInit(): void {
    const {id_user} = JSON.parse(localStorage.getItem('userSe')!);
    this.serviceProject.getTaskPriorityByUser(id_user).subscribe((data)=>{
      this.single = data;
    })
  }
  
  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
