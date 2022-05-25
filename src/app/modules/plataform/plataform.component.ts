import { Component, OnInit } from '@angular/core';
import { SocketService } from '../chat/socket.service';
import { ChatService } from '../chat/chat.service';
import { LoginService } from '../login/login.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-plataform',
  templateUrl: './plataform.component.html',
  styleUrls: ['./plataform.component.css']
})
export class PlataformComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

}
