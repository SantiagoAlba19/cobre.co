import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { usuarios } from '../../models/interfaces';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuarios=[];
  foto1: string;
  foto2: any;
  constructor(  private router : Router,private camera: Camera) { }
  nombre: string ;
  celular : number;
  foto : any;
  pass : string;

  users : Array<usuarios>= new Array<usuarios>();
  ngOnInit() {
 
  }
   usuariosPeliculasApp() {
  
  }

  regForm(){
    let user ={
      nombre: this.nombre,
      celular : this.celular,
      pass: this.pass,
      foto : this.foto,
    }
     
      this.usuarios = JSON.parse(localStorage.getItem( "usuarios"))
    if(JSON.parse(localStorage.getItem( "usuarios")) == null ){
      this.users.push(user)
      localStorage.setItem("usuarios", JSON.stringify(this.users) )
      localStorage.setItem("user",JSON.stringify(user)  )
      this.router.navigate(['/home'])
    }else{
        this.usuarios = JSON.parse(localStorage.getItem( "usuarios")).filter((filtro)=>{
      return filtro.nombre
      .toLocaleLowerCase()
      .includes(this.nombre.toLocaleLowerCase());
    }) 
    if(this.usuarios.length === 0){
        this.users.push(user)
        localStorage.setItem("usuarios", JSON.stringify(this.users) )
        localStorage.setItem("user",JSON.stringify(user)  )
        this.router.navigate(['/home'])
    }else{
      console.log("usuario existente")
    }
    }
  
   
  }



  camara(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      sourceType : this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.foto =  imageData;
    }, (err) => {
     console.log(err)
    });
  }



}
