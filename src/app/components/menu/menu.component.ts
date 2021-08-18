import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user : any ={};
  foto ;

  constructor( private router : Router,private _sanitizer: DomSanitizer, private auth : AuthService) {}

  ngOnInit() {
  this.getUser();
  this.transform(this.user.foto)
  this.auth.getUser$().subscribe(res =>{
    console.log(res)
  })
  }
 
  getUser(){
   this.auth.getUser$().subscribe(res =>{
     this.user = res
   })
    this.foto = "data:image/jpeg;base64,"+this.user.foto;
    this.user.foto = "data:image/jpeg;base64,"+this.user.foto;
  }
  transform(value: string): SafeHtml {
    return this._sanitizer.sanitize(SecurityContext.HTML, this._sanitizer.bypassSecurityTrustHtml(value))
    }

    toogleTheme(event){
      if(event.detail.checked){
        document.body.setAttribute('color-theme', 'dark');
      }else{
        document.body.setAttribute('color-theme', 'light');
      }
    }
  
  logout(){
   this.auth.logout()
    this.router.navigate(['/inicio-sesion'])
    
  }

}
