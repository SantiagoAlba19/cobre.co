import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { usuarios } from '../models/interfaces';
import { Subject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  celular : number;
  foto :string ="" ;
  user:usuarios[];
  user$:Subject<usuarios[]>;
  users : Array<usuarios>= new Array<usuarios>();
  constructor(private router: Router,  public alertController: AlertController) { 
    this.user$ = new Subject();
  }
  nombre;
  pass :string =""
  regex_letras = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/;
 
 
  register(){

    
    let user:usuarios ={
      nombre: this.nombre,
      celular : this.celular,
      pass: this.pass,
      foto : this.foto,
    }
    if(this.nombre.search(this.regex_letras)){
      this.presentAlertExprecion()
    }else{
        if(JSON.parse(localStorage.getItem( "user")) == null){
      localStorage.setItem("user",JSON.stringify(user))
    }
    if(JSON.parse(localStorage.getItem( "usuarios")) == null )
    {
      this.users.push(user)
      localStorage.setItem("usuarios", JSON.stringify(this.users) )
      this.router.navigate(['/home'])
    }else{
      this.users = JSON.parse(localStorage.getItem( "usuarios")).filter((filtro)=>{
      return filtro.nombre
      .toLocaleLowerCase()
      .includes(this.nombre.toLocaleLowerCase());
    }) 
    if(this.users.length === 0){
        this.users = JSON.parse(localStorage.getItem( "usuarios"))
        this.users.push(user)
        localStorage.setItem("usuarios", JSON.stringify(this.users) )
        localStorage.setItem("user",JSON.stringify(user)  )
        this.router.navigate(['/home'])
    }else{
      this.presentAlerUsrExistente()
    }
    }
    this.getUser()
    }
  
  }
  login(){
    if(JSON.parse(localStorage.getItem( "usuarios")) == null){
      localStorage.setItem("user",JSON.stringify([])  )
    }
    let user;
    this.users = JSON.parse(localStorage.getItem( "usuarios")).filter((filtro)=>{
      return filtro.nombre
      .toLocaleLowerCase()
      .includes(this.nombre.toLocaleLowerCase());
      
    }) 
    if(this.users.length > 0){
     user =this.users[0];
      if(user.pass == this.pass){
        localStorage.setItem("user",JSON.stringify(user)  )
        this.router.navigate(['/home'])
      }else{
        console.log("contraseña incorrecta")
        this.presentAlertCredenciales()
      }
    }else{
      this.presentAlertCredenciales()
    }
    this.getUser()
  }
  logout(){
    localStorage.setItem("user",JSON.stringify([])  );
    this.getUser()

  }


  getUser(){
    this.user = JSON.parse(localStorage.getItem( "user"))
    this.user$.next(this.user)
  }

  getUser$(): Observable<any[]>{
    return  this.user$.asObservable()
  }





  async presentAlerFoto() {
    const alert = await this.alertController.create({
      header: "Foto de perfil",
      message: "Por favor toma una foto para tu perfil",
      buttons: [
        {
          text: "Ok",
          role: "Ok",
          cssClass: "secondary",
          handler: (blah) => {
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlertNombre() {
    const alert = await this.alertController.create({
      header: "Nombre de perfil",
      message: "Por favor escribe un nombre de usuario",
      buttons: [
        {
          text: "Ok",
          role: "Ok",
          cssClass: "secondary",
          handler: (blah) => {
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlertCelular() {
    const alert = await this.alertController.create({
      header: "Celular",
      message: "Por favor escribe un numero de celular de contacto",
      buttons: [
        {
          text: "Ok",
          role: "Ok",
          cssClass: "secondary",
          handler: (blah) => {
          },
        },
      ],
    });
    await alert.present();
  }
  async presentAlertPass() {
    const alert = await this.alertController.create({
      header: "Contraseña",
      message: "Por favor escribe una contraseña",
      buttons: [
        {
          text: "Ok",
          role: "Ok",
          cssClass: "secondary",
          handler: (blah) => {
          },
        },
      ],
    });
    await alert.present();
  }
  async presentAlerUsrExistente() {
    const alert = await this.alertController.create({
      header: "Usuario",
      message: "Usuario existente",
      buttons: [
        {
          text: "Ok",
          role: "Ok",
          cssClass: "secondary",
          handler: (blah) => {
          },
        },
      ],
    });
    await alert.present();
  }

  async presentAlertCredenciales() {
    const alert = await this.alertController.create({
 
      message: "Credenciales incorrectas",
      buttons: [
        {
          text: "Ok",
          role: "Ok",
          cssClass: "secondary",
          handler: (blah) => {
          },
        },
      ],
    });
    await alert.present();
  }
  async presentAlertExprecion() {
    const alert = await this.alertController.create({
 
      message: "No se permiten caracteres especiales ni numeros en el nombre de usuario, por favor corrigelos y vuelve a intentarlo",
      buttons: [
        {
          text: "Ok",
          role: "Ok",
          cssClass: "secondary",
          handler: (blah) => {
          },
        },
      ],
    });
    await alert.present();
  }


}
