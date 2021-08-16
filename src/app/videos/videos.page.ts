import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import YouTubePlayer from 'youtube-player'

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  player:any;
  stopped:boolean =true;
  @Input() video : string;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.play();
  }

  backClicked() {
   this.modalController.dismiss()
  }


  play(){
    if(this.stopped){
      if(this.player ==  undefined){
        this.player = YouTubePlayer('divid');
      }
      this.player.loadVideoById(this.video).then(()=>{
        this.player.playVideo();
        this.stopped = false;
      })
    }
  }

  stop(){
    if(!this.stopped){
      this.player.stopVideo().then(()=>{
        this.stopped = true;

      })
    }
  }

}
