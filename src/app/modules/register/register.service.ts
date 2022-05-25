import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfor } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  private apiUrl: string = environment.baseUrl;

  createUser(user: UserInfor): Observable<UserInfor>{
    const url = `${this.apiUrl}/users/createUser`;
    return this.http.post<UserInfor>(url, user);
  }
}
