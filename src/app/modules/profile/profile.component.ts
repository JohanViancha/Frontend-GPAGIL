import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchUser, UserInfor } from 'src/app/interfaces/user.interface';
import { Storage, ref, uploadBytes, listAll,getDownloadURL, list } from '@angular/fire/storage'
import { LoginService } from '../login/login.service';
import { AlertsService } from 'src/app/core/alerts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  userSe: UserInfor;
  selectTab:number = 1;
  imgPreview: string | ArrayBuffer = '';
  img :any | ArrayBuffer  | Blob | Uint8Array=new ArrayBuffer(8);
  passwordChange = {
    'passwordCurrent' : '',
    'passwordNew' : '',
    'passwordNewRepeat' : '',

  }
  
  constructor(private router: Router,
              private storage: Storage,
              private loginService: LoginService,
              private alertService: AlertsService){
    this.userSe = this.dataLocalStorage();
  }
  ngOnInit(): void {
    const imageRef = ref(this.storage, 'images');
    listAll(imageRef)
    .then(async (res)=>{
      const url = res.items.filter((img:any)=>img._location.path == this.userSe.img_user)
     this.imgPreview = await getDownloadURL(url[0]);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  dataLocalStorage(): UserInfor {
    if (localStorage.length == 0) {
        this.router.navigate(['/login'])
    }
    return JSON.parse(localStorage.getItem('userSe')!);

  }

  updateProfile():void{

    this.alertService.questionAlert('Confirmación de cambio de contraseña', '¿Seguro que desea cambiar la información de su perfil?, si confirma su sesión sera cerrada por seguridad')
    .then(({isConfirmed})=>{
      if(isConfirmed){
        const imgRef = ref(this.storage, `images/${this.img.name}`)
        uploadBytes(imgRef, this.img)
        .then((response)=>{
          this.userSe.img_user = response.metadata.fullPath;
          this.loginService.updateUser(this.userSe).subscribe((res)=>{
            if(res.updateState){
              this.alertService.showAlert('success','Actualización del usurio', 'Los datos del usuario han sido actualizados')
              this.loginService.exitSesion();
            }
       })
      })
      }
    });
   
   
  }

  loadImage(event:any){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.img = file;
      const reader = new FileReader();
      reader.onload = e => this.imgPreview = reader.result!;
      reader.readAsDataURL(file);
    }
  }

  changeTabs(){
    if(this.selectTab==1){
      this.selectTab++;
    }else{
      this.selectTab--;
    }
  }

  changePassword(){

    if(this.passwordChange.passwordNew === this.passwordChange.passwordNewRepeat){
      const searchUser: SearchUser ={
        email: this.userSe.email_user,
        password: this.passwordChange.passwordCurrent
      }
      this.loginService.authentication(searchUser).subscribe((res)=>{
        if(res.state == 'correct'){
          this.alertService.questionAlert('Confirmación de cambio de contraseña', '¿Seguro que desea cambiar su contraseña?, si confirma su sesión sera cerrada por seguridad')
          .then(({isConfirmed})=>{
            if(isConfirmed){
              this.loginService.updatePassword(this.userSe.email_user, this.passwordChange.passwordNew).subscribe((res)=>{
                if(res.updateState){
                  this.alertService.showAlert('success', 'Cambio de contraseña', 'La contraseña ha sido actualizada correctamente')
                  this.loginService.exitSesion();
                }
              })
            }
          })
        }else{
          this.alertService.showAlert('error', 'Cambio de contraseña' , 'La contraseña actual es incorrecta');
        }
      })    
    }else{
      this.alertService.showAlert('error', 'Cambio de contraseña', 'La contraseña nueva debe ser confirmada')
    }
   
  }
}
