import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { usuarios } from '../../models/interfaces';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuarios=[];
 
  constructor(  private router : Router,private camera: Camera, 
    private auth : AuthService) { }
  nombre: string ;
  celular : number;
  foto : any;
  pass : string;

 
  ngOnInit() {
 
  }

  regForm(){
  this.auth.register();
   
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
