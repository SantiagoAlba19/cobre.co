import { Component, OnInit } from '@angular/core';
import { SecurityContext } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService } from '../servicios/data.service';
import { pelicula } from '../models/interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  user : any ={};
  foto ;

  peliculas :pelicula[]= [];
  listadoGeneros : boolean = false;
  //categorias
  accion:pelicula[]=[];
  animado:pelicula[]=[];
  suspenso:pelicula[]=[];
  terror:pelicula[]=[];

  constructor(private router : Router, private _sanitizer: DomSanitizer, private movies : DataService) {}

  ngOnInit() {
    this.getUser();
    this.peliculas = this.movies.movies
    this.categorias()
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem( "user"))
    this.foto = "data:image/jpeg;base64,"+this.user.foto;
    this.user.foto = "data:image/jpeg;base64,"+this.user.foto;
  }
  transform(value: string): SafeHtml {
    return this._sanitizer.sanitize(SecurityContext.HTML, this._sanitizer.bypassSecurityTrustHtml(value))
    }


    detalles(pelicula){
      localStorage.setItem('pelicula',JSON.stringify(pelicula) )
      this.router.navigate(['/detalles'])
    }

    toogleGeneros(event){
      this.listadoGeneros = !this.listadoGeneros
    }
    
    categorias(){
      this.accion=[];
      this.animado=[];
      this.terror=[];
      this.suspenso=[];
      this.peliculas.forEach(element => {
        switch(element.genre){
          case "Accion" : 
            this.accion.push(element)
            break;
          case "Suspenso" : 
            this.suspenso.push(element)
            break;
          case "Animado" : 
            this.animado.push(element)
            break;
          case "Terror" : 
            this.terror.push(element)
            break;
        }
      });
    }

}
