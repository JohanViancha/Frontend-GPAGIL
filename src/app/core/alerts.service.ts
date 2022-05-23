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

  showAlert(state: string, msg: string) {
    switch (state) {
      case 'Correcto':
        Swal.fire({
          title: state,
          text: msg,
          icon: 'success'
        })
        break;
      case 'Error':
        Swal.fire({
          title: state,
          text: msg,
          icon: 'error'
        })
        break;
    }


  }
}
