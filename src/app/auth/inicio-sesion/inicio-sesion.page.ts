import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
 

  constructor(private router: Router, private auth : AuthService) { }

  ngOnInit() {
  }

  logForm(){
    this.auth.login()
  }
}
