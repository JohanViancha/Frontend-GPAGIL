import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { UserInfor } from 'src/app/interfaces/user.interface';
import { AlertsService } from 'src/app/core/alerts.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Storage, ref, uploadBytes } from '@angular/fire/storage'
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  faArrowLeft = faArrowLeft
  imgPreview: string | ArrayBuffer = '';
  img : ArrayBuffer  | Blob | Uint8Array=new ArrayBuffer(8);
  user:UserInfor = {
    name_user:'',
    lastname_user:'',
    email_user:'',
    password_user:'',
    img_user: '',
    id_role :0
  }

  passwordUserRepeit = "";

  constructor(private serviceRegister : RegisterService,
              private alertService: AlertsService,
              private storage: Storage,
              private router: Router) { }

  ngOnInit(): void {
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

  registerUser(){
    this.alertService.loading();
    if(this.user.password_user === this.passwordUserRepeit){
      const imgRef = ref(this.storage, `images/${this.user.name_user}_${this.user.lastname_user}`)
      uploadBytes(imgRef, this.img)
      .then((response)=>{
        this.user.img_user = response.metadata.fullPath;
        this.serviceRegister.createUser(this.user).subscribe((response)=>{
          this.alertService.showAlert('success','Creación de usuario', 'El usuario ha sido registrado, se enviará un correo para verificar la cuenta')
          this.router.navigate(['/login'])
      })
       
      })
      .catch(err=> console.log(err))

 
    }else{
      this.alertService.showAlert('error', 'Creación de usuario', 'La contraseña debe ser confirmada')
    }
    
  }

}
