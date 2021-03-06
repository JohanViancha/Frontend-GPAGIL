import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseAuth, SearchUser, User, UserInfor } from '../../interfaces/user.interface';
import { ReturnMessage } from 'src/app/interfaces/general.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string = environment.baseUrl;
  private user: User = {
    id_user:       0,
    name_user:     '',
    lastname_user: '',
    email_user:    '',
    role_user:     0
  }

  get getUser():User{
    return this.user;
  }

  set setUser(user:any){
    this.user = user;
  }
 
  constructor(private http: HttpClient,
              private router: Router) { }

  
  mostrar(): Observable<UserInfor[]>{
    const url = `${this.apiUrl}/users/getUsersAll`;    
    return this.http.get<UserInfor[]>(url);    
  }

  authentication(user: SearchUser): Observable<ResponseAuth>{
    const url = `${this.apiUrl}/users/getUserByAuthentication`;
    return this.http.post<ResponseAuth>(url, user);
  }

  sendEmailForRecoverPassword(email:string):Observable<ReturnMessage>{
    const url = `${this.apiUrl}/users/sendEmailForRecoverPassword`;
    return this.http.post<ReturnMessage>(url, {email});
  }

  verifyCodeSecurity(code:string):Observable<ReturnMessage>{
    const url = `${this.apiUrl}/users/verifyCodeSecurity`;
    return this.http.post<ReturnMessage>(url, {code});
  }

  updatePassword(email:string,password:string):Observable<ReturnMessage>{
    const url = `${this.apiUrl}/users/updatePassword`;
    return this.http.post<ReturnMessage>(url, {email,password});
  }

  clearCodeSecurity(email:string):Observable<ReturnMessage>{
    const url = `${this.apiUrl}/users/clearCodeSecurity`;
    return this.http.post<ReturnMessage>(url, {email});
  }

  updateUser(user: UserInfor):Observable<ReturnMessage>{
    const url = `${this.apiUrl}/users/updateUser`;
    return this.http.post<ReturnMessage>(url, user);
  }
  exitSesion():void{
    this.router.navigate(['/login']);
    localStorage.clear();
  }
  

}
