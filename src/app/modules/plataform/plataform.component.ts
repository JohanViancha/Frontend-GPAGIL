import { Component, OnInit } from '@angular/core';
import { SocketService } from '../chat/socket.service';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-plataform',
  templateUrl: './plataform.component.html',
  styleUrls: ['./plataform.component.css']
})
export class PlataformComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
  }

}
