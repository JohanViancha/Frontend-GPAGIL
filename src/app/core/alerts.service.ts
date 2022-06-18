import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from '../modules/login/login.service';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  password$ = new Subject();
  constructor(loginService: LoginService) { }

  get validationPassword$(){
    return this.password$.asObservable();
  }

  setvalidationPassword(value:any):void{
    this.password$.next(value);
  }

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
      confirmButtonText: 'Confirmar',
      cancelButtonText:'Cancelar'
    })

    

 }

  changePasswordAlert(){
  return new Observable((Subscriber)=>{
  const steps = ['1', '2', '3']
  let passsword1='', passsword2 = '';
  const Queue = Swal.mixin({
    progressSteps: steps,
    allowOutsideClick:false,
    showCancelButton:true,
    confirmButtonText: 'Siguiente',
    cancelButtonText:'Cancelar',
    // optional classes to avoid backdrop blinking between steps
    showClass: { backdrop: 'swal2-noanimation' },
    hideClass: { backdrop: 'swal2-noanimation' },
    preConfirm: (value)=>{
      if(!value){
        Swal.showValidationMessage(
          `El valor es requerido`
        )
      }
    },
    didClose:()=>{
      Subscriber.next({step:0})
    }
  })
  Queue.fire({
    input:'email',
    title: 'Envío de codigo de seguridad',
    text:'Ingrese su correo electronico con el cual está registrado',
    currentProgressStep: 0,
    // optional class to show fade-in backdrop animation which was disabled in Queue mixin
    showClass: { backdrop: 'swal2-noanimation' },
  }).then((res)=>{
    if(!res.isDismissed && res.value){
      Subscriber.next({step:1,value: res.value});
      Queue.fire({
        input:'text',
        title: 'Verificación del codigo de seguridad',
        text: 'Ingrese el codigo de seguridad que se le ha envíado al correo electronico',
        timer: 180000,
        timerProgressBar: true,
        currentProgressStep: 1
      }).then((res)=>{
          
        if(!res.isDismissed){
          Subscriber.next({step:2,value: res.value});              
          this.validationPassword$.subscribe((res)=>{
            if(res){
              Queue.fire({
                title: 'Cambio de contraseña',
                html:
                '<label>Nueva contraseña</label><input type="password" id="swal-password1" class="swal2-input">' +
                '<br><label>Repetir contraseña</label><input type="password" id="swal-password2" class="swal2-input">',
                currentProgressStep: 2,
                preConfirm:()=>{
                  passsword1 = (<HTMLInputElement>document.getElementById('swal-password1')).value;
                  passsword2 =  (<HTMLInputElement>document.getElementById('swal-password2')).value;
                  if(passsword1 != passsword2){
                    Swal.showValidationMessage(
                      `La contraseñas ingresadas deben ser iguales`
                    )
                  }
                }
              }).then((res)=>{
                if(!res.isDismissed){
                  Subscriber.next({step:3,value: passsword1});
                }
              })
            }else{
              this.showAlert('error','Error codigo de seguridad', 'El codigo de seguridad es incorrecto')
            }
            
          })
        }
      })
    }
  })
  
  })


 }

}
