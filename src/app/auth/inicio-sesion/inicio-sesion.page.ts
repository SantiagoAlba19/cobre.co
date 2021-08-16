import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  usuarios: any;

  constructor(private router: Router) { }
  nombre:string ="";
  pass :string =""
  ngOnInit() {
  }

  logForm(){
    let user={nombre : this.nombre, pass : this.pass}
    this.usuarios = JSON.parse(localStorage.getItem( "usuarios")).filter((filtro)=>{
      return filtro.nombre
      .toLocaleLowerCase()
      .includes(this.nombre.toLocaleLowerCase());
    }) 
    if(this.usuarios.length > 0){
      if(this.usuarios[0].pass == this.pass){
        localStorage.setItem("user",JSON.stringify(user)  )
        this.router.navigate(['/home'])
      }else{
        console.log("contraseña incorrecta")
      }
    }else{
      console.log("usuario inexistente")
    }
    
    
  }
}
