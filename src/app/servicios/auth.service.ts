import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { usuarios } from '../models/interfaces';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  celular : number;
  foto :string ="" ;
  user:usuarios[];
  user$:Subject<usuarios[]>;
  users : Array<usuarios>= new Array<usuarios>();
  constructor(private router: Router,) { 
    this.user$ = new Subject();
  }
  nombre:string ="";
  pass :string =""
 
 
 
  register(){
    let user:usuarios ={
      nombre: this.nombre,
      celular : this.celular,
      pass: this.pass,
      foto : this.foto,
    }
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
      console.log("usuario existente")
    }
    }
    this.getUser()
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
      }
    }else{
      console.log("usuario inexistente")
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
}
