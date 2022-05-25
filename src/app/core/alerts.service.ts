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
}
