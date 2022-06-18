import { Injectable } from '@angular/core';
import { Subject, Observable, Subscriber } from 'rxjs';
import { chatMessage } from 'src/app/interfaces/chat.interface';
import { SocketService } from './socket.service';
import { SubTask } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  idUser: number =0;
  chat = new Subject<chatMessage[]>();

  constructor(private socketService: SocketService) { 
    this.socketService.io.on('getAllMessage', (data:chatMessage[])=>{
      this.chat.next(data);
    })
  }

  
  getMessage(){
    return new Observable((Subscriber)=>{
      this.socketService.io.emit('getAllMessage')
      this.socketService.io.on('getAllMessage', (data:chatMessage[])=>{
        Subscriber.next(data);
        this.chat.next(data);
      })
    })
  }

  sendMessageByProjectUser(idUserProject:number, message:string):Promise<chatMessage[]>{

    return new Promise((resolve,reject)=>{
      try{
        this.socketService.io.emit("sendMessageByProjectUser", {idUserProject:idUserProject,
          message:message});
      }catch(err){
        console.log(err);
      }
    })
   
  }
}
