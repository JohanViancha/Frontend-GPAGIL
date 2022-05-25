import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReturnMessage } from '../interfaces/general.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  idUser = 0;
  nameUser = "";
  lastnameUser = "";
  roleUser = 0
  
  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  verifyUser(idUser:number):Observable<ReturnMessage>{
    const url = `${this.apiUrl}/users/verifyUser`;
    return this.http.post<ReturnMessage>(url, {idUser});
  }

}
