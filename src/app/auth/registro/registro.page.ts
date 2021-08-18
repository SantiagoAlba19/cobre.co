import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';
import {FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuarios=[];
 
  constructor(  private router : Router,private camera: Camera, 
    private auth : AuthService, public alertController: AlertController) { }
  nombre: string ;
  celular : number;
  foto : any;
  pass : string;

 
  ngOnInit() {
   const nombre = "dkjfdkjfsdññññ"
   if(nombre.search(this.regex_letras)){
     console.log(true)
   }else{
    console.log(false) 
   }

  }
 private regex_letras = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/;
  private regex_numeros = /^[0-9]+$/;



  regForm(){
    // if(this.auth.foto == undefined || this.auth.foto == "" ){
    //   this.auth.presentAlerFoto()
    // }else{
       if(this.auth.nombre == undefined || this.auth.nombre == "" ){
      this.auth.presentAlertNombre()
      }else{
      if(this.auth.celular == undefined || this.auth.celular == 0 ){
        this.auth.presentAlertCelular() }
        else{
           if(this.auth.pass == undefined || this.auth.pass == "" ){
          this.auth.presentAlertPass()
        }else{
          this.auth.register();
        }
        }
    }
   // }
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
     this.auth.foto =imageData;
    }, (err) => {
     console.log(err)
    });
  }


}
