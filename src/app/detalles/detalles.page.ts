import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { pelicula } from '../models/interfaces';
import { ModalController } from '@ionic/angular';
import { VideosPage } from '../videos/videos.page';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  player:any;
  stopped:boolean =true;
  detallePelicula : pelicula ;
  currentRate =0;
  calificaciones=[];
  calificacionGeneral = 0
  calificationGeneral;
  votosPelicula=0;
  constructor(public modalController: ModalController, config: NgbRatingConfig) {
    config.max = 5;
     }

  ngOnInit() {
    this.getPelicula();
    this.getCalificaciones();
  }
  getPelicula(){
    this.detallePelicula = JSON.parse(localStorage.getItem( "pelicula"))
  }
  getCalificaciones(){
    let suma = 0
    this.votosPelicula = 0
    if(JSON.parse(localStorage.getItem( "calificaciones")) == null){
      localStorage.setItem("calificaciones",JSON.stringify([]) )
    }
      this.calificaciones =JSON.parse(localStorage.getItem( "calificaciones"))
      this.calificaciones.forEach(element => {
        if(element.pelicula == this.detallePelicula.title){
           suma =   element.calificacion + suma
           this.votosPelicula ++
        }
      });
    this.calificationGeneral = (suma/this.votosPelicula).toFixed(1)
    
  }

  async trailerView(){
    const modal = await this.modalController.create({
      component: VideosPage,
      cssClass: 'my-custom-class',
      componentProps:{
        video : this.detallePelicula.trailer
      }
    });
    return await modal.present();
  
  }

  calificacion(){
    
    if(JSON.parse(localStorage.getItem( "calificaciones")) == null){
      localStorage.setItem("calificaciones",JSON.stringify([]) )
    }
    let calificacion ={
      "usuario":"santiago",
      "calificacion": this.currentRate,
      "pelicula": this.detallePelicula.title
    }
   this.calificaciones.push(calificacion)
        localStorage.setItem("calificaciones",JSON.stringify(this.calificaciones) );
        this.getCalificaciones()
  }



}
