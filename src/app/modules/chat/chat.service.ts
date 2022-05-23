import { Injectable } from '@angular/core';
import { chatMessage } from 'src/app/interfaces/chat.interface';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socketService: SocketService) { }

  getMessageByProjectUser(idProject:number):Promise<chatMessage[]>{
    return new Promise((resolve, reject)=>{
      try{
        this.socketService.io.emit("getMessageByProjectUser", idProject);
        this.socketService.io.on('getMessageByProjectUser',(messages)=>{
           resolve(messages);
        })
      }catch(err){
        reject(err);
      }
     
    })
   
  }

  sendMessageByProjectUser(idUserProject:number, message:string):Promise<chatMessage[]>{
    return new Promise((resolve, reject)=>{
      try{
        this.socketService.io.emit("sendMessageByProjectUser", {idUserProject:idUserProject,
          message:message});
        this.socketService.io.on('sendMessageByProjectUser',(response)=>{
           resolve(response);
        })
      }catch(err){
        reject(err);
      }
     
    })
   
  }
}
