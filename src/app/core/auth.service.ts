import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private id_user:  number = 0;
  private name_user: string = '';
  private lastname_user: string = '';
  private email_user: string = '';
  private password_user: string = '';
  private img_user: string = '';

 
constructor() { }

}
