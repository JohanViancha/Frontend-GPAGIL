import { Component, OnInit } from '@angular/core';
import { faMessage, faClock, faUser } from '@fortawesome/free-solid-svg-icons';
import { chatMessage } from 'src/app/interfaces/chat.interface';
import { ChatService } from './chat.service';
import { ProjectService } from '../project/project.service';
import { ProjectSingle, Project } from '../../interfaces/project.interface';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  projectSelected: ProjectSingle = {
    id_project:0,
    name_project:'',
    description_project:'',
    id_user_project:0
  };
  openChat: boolean=false;
  messages: chatMessage[] = [];
  message: string = "";
  constructor(private serviceChat:ChatService,
              private serviceProject: ProjectService,
              private serviceUser: LoginService) { }

  faMessage = faMessage;
  faClock = faClock;
  faUser = faUser;
  ngOnInit(): void {
    this.serviceProject.selectedProject$.subscribe((project:ProjectSingle)=>{
      this.projectSelected = project;
    })
  }

  openModalChat():void{
    this.openChat = !this.openChat;
    if(this.openChat){
    this.showMessages();
    }
  }

  showMessages(){
    this.message = '';
    this.serviceChat.getMessageByProjectUser(this.projectSelected.id_project).then((response:chatMessage[])=>{
      this.messages = response;
    });
  }  


  sendMessage(){
    this.serviceChat.sendMessageByProjectUser(this.projectSelected.id_user_project,this.message).then((message)=>{
      console.log('asfasf');
        this.showMessages();
    })
  }

}
