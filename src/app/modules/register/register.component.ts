import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { UserInfor } from 'src/app/interfaces/user.interface';
import { AlertsService } from 'src/app/core/alerts.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faArrowLeft = faArrowLeft
  user:UserInfor = {
    name_user:'',
    lastname_user:'',
    email_user:'',
    password_user:'',
    id_role :0
  }

  passwordUserRepeit = "";

  constructor(private serviceRegister : RegisterService,
              private alertService: AlertsService) { }

  ngOnInit(): void {
  }

  registerUser(){

    if(this.user.password_user === this.passwordUserRepeit){
      this.serviceRegister.createUser(this.user).subscribe((response)=>{
        this.alertService.showAlert('success','Usuario creado', 'El usuario ha sido registrado, se enviará un correo para verificar la cuenta' )
      })
    }
    
  }

}
