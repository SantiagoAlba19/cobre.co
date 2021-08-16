import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Camera} from '@ionic-native/camera/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';

import{ HttpClientModule }from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [AppComponent, MenuComponent, HeaderMenuComponent],
  entryComponents: [],
  exports:[HeaderMenuComponent],
  imports: [BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(), AppRoutingModule, NgbModule],
  providers: [
    Camera,
    { provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
