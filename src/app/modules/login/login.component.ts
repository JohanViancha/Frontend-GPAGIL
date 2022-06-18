import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import Swal from 'sweetalert2';
import { AlertsService } from '../../core/alerts.service';

import { ResponseAuth, SearchUser, UserInfor } from '../../interfaces/user.interface';
import { LoginService } from './login.service';
import { ReturnMessage } from '../../interfaces/general.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  esp: string = '';

  user: SearchUser = {
    email: '',
    password: ''
  }

  constructor(private loginService: LoginService, 
              private router: Router,
              private alertService: AlertsService) { }
 
              ngOnInit(): void {
   
  }

  authentication() {    

    this.alertService.loading();
    this.loginService.authentication(this.user)
      .subscribe((userRe: ResponseAuth) => {
        Swal.close();
        if (userRe.state === 'correct') {  
          localStorage.setItem('userSe',JSON.stringify(userRe.user));    
          this.router.navigate(['plataform/dashboard'])
        }else if(userRe.state === 'no-verify'){
          this.alertService.showAlert('info', 'Usuario no verificado', 'El usuario no ha sido verificado, por favor ingrese a su cuenta de correo registrada y verifique su usuario');
        }

        else if(userRe.state === 'requerid'){
          this.alertService.showAlert('error', 'Error', 'Todos los campos son obligatorios');
        }else{
          this.alertService.showAlert('error', 'Error', 'El usuario y/o contraseña son incorrectos');
        }
      }, (error => { 

       console.log(error);
          
      }))
  }

  dataLocalStorage(): UserInfor{
    return JSON.parse(localStorage.getItem('userSe')!);
  }

  recoverPassword(){
    let userEmail:string ='';
    this.alertService.changePasswordAlert().subscribe((data:any)=>{
      switch(data.step){
        
        case 1:
          userEmail = data.value;
          this.loginService.sendEmailForRecoverPassword(data.value).subscribe(()=>{
          });
        break;
        case 2:
          this.loginService.verifyCodeSecurity(data.value).subscribe((response)=>{
            this.alertService.setvalidationPassword(response.updateState);
          });
        break;
        
        // @ts-ignore
        case 3:
          this.loginService.updatePassword(userEmail,data.value).subscribe((response)=>{
            if(response.updateState){
              this.alertService.showAlert('success','Recuperación de contraseña', 'La contraseña ha sido actualizada');
            }
          });
        default:
          this.loginService.clearCodeSecurity(userEmail).subscribe((response)=>{
            console.log(response);
          });

        break;
      }
     
    })
  }

}
