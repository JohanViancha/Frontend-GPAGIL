import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }


  loading(){
      let timerInterval:any;
      Swal.fire({
        title: 'Cargando...',
        html: 'Espere un momento',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      })
  }

  showAlert(state: any,title:string,  msg: string) {
     Swal.fire({
          title: title,
          text: msg,
          icon: state
      })
    
  }

  questionAlert(title:string,  msg: string):Promise<any> {
    
    return Swal.fire({
      title: title,
      text: msg,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    })

    

 }

 changePasswordAlert(){
   
 }

 recoverPassword():Promise<any> {
    return Swal.fire({
      title: 'Recuperación de contraseña',
      input: 'email',
      inputLabel: 'Ingrese el email con el que está registrado en la plataforma',
      inputPlaceholder: 'Ingrese su dirección de correo'
    })
    
 }


}
