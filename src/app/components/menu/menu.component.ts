import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user : any ={};
  foto ;

  constructor( private router : Router,private _sanitizer: DomSanitizer) {}

  ngOnInit() {
  
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
    localStorage.setItem("user",JSON.stringify([])  )
    this.router.navigate(['/inicio-sesion'])
    
  }

}
