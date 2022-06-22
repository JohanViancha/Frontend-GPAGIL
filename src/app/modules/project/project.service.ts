import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project, ProjectSingle } from '../../interfaces/project.interface';
import { Task, TaskbPriority } from '../../interfaces/task.interface';
import { KeyValue, ReturnMessage } from '../../interfaces/general.interface';
import { User, UserInfor } from 'src/app/interfaces/user.interface';

const initProject: ProjectSingle = {
  id_project: 0,
  name_project:'',
  description_project:'',
  id_user_project: 0
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private project$ = new BehaviorSubject<ProjectSingle>(initProject);
  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get selectedProject$():Observable<ProjectSingle>{
    return this.project$.asObservable();
  }

  setProject(project: ProjectSingle):void{
    this.project$.next(project);
  }

  getProjectById(idProject:number):Observable<Project>{
    const url = `${this.apiUrl}/projects/getProjectById`;
    return this.http.post<Project>(`${url}`, {'idProject': idProject});

  }

  getProjectByIdUserIdProject(idProject:number, idUser:number):Observable<Project>{
    const url = `${this.apiUrl}/projects/getProjectByIdUserIdProject`;
    return this.http.post<Project>(`${url}`, {'idProject': idProject,'idUser':idUser});

  }
  getProjectByUsuario(id:number):Observable<Project[]>{
    const url = `${this.apiUrl}/projects/getProjectByUsuario`;
    return this.http.post<Project[]>(`${url}`, {'idUsuario': id});
  }

  getTaskByAssignment(idUser:number):Observable<any>{
    const url = `${this.apiUrl}/tasks/getTaskByAssignment`;
    return this.http.post<any>(`${url}`, {idUser});
  }

  getTaskByProject(id:number):Observable<any>{
    const url = `${this.apiUrl}/tasks/getTaskByProject`;
    return this.http.post<any>(`${url}`, {'idProject': id});
  }

  
  getTotalyByUser(id:number):Observable<any>{
    const url = `${this.apiUrl}/projects/getTotalyByUser`;
    return this.http.post<any>(`${url}`, {'idUser': id});
  }

  updateStateTask(idTask: number, state:string):Observable<ReturnMessage>{
    const url = `${this.apiUrl}/tasks/updateStateTask`;
    return this.http.post<ReturnMessage>(`${url}`, {'idTask': idTask, 'state':state});
  }

  getUserByProject(idProyect:number):Observable<User[]>{
    console.log(idProyect);
    const url = `${this.apiUrl}/users/getUserByProject`;
    return this.http.post<User[]>(`${url}`,{'idProyect': idProyect});
  }

  createTask(nameTask:string, descriptionTask:string, assignment:number,
      dateEnd: Date, priorityTask:string,subTasks: KeyValue[], idProject:number):Observable<ReturnMessage>{
    const url = `${this.apiUrl}/tasks/createTask`;
    return this.http.post<ReturnMessage>(`${url}`, 
    {nameTask,descriptionTask,assignment,dateEnd,priorityTask,subTasks, idProject});
  }

  createProject(nameProject:string, descriptionProject:string, assignment:UserInfor[],
  dateEnd: Date, idUser:number):Observable<ReturnMessage>{
    const url = `${this.apiUrl}/projects/createProject`;
    return this.http.post<ReturnMessage>(`${url}`, 
    {nameProject,descriptionProject,assignment,dateEnd,idUser});
  }

  getTaskPriorityByUser(idUser:number):Observable<never[]>{
    const url = `${this.apiUrl}/tasks/getTaskPriorityByUser`;
    return this.http.post<never[]>(`${url}`, {idUser});
  }

  updateStateSubTask(idSubTask:number):Observable<ReturnMessage>{
    const url = `${this.apiUrl}/tasks/updateStateSubTask`;
    return this.http.post<ReturnMessage>(`${url}`, {idSubTask});
  }

  finishProjectById(idProyect:number):Observable<ReturnMessage>{
    const url = `${this.apiUrl}/projects/finishProjectById`;
    return this.http.put<ReturnMessage>(`${url}`, {idProyect});
  }
}
