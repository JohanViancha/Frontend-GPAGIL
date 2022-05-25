import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { ReturnMessage } from 'src/app/interfaces/general.interface';
import { AlertsService } from '../../core/alerts.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  idUser : number = 0;
  message:string = "";
  constructor(private activeRoute : ActivatedRoute,
              private autService : AuthService,
              private alertService: AlertsService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params=>{
      this.idUser = params['id'];
      this.autService.verifyUser(this.idUser).subscribe((message:ReturnMessage)=>{
        if(message.updateState){
          this.message = 'Tu cuenta ha sido verificada satisfactoriamente';
        }else{
          this.message = 'Tu cuenta no fue verificada, comuniquese con soporte';
        }
      })
    });
  }

}
