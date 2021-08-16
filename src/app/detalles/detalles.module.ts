import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesPageRoutingModule } from './detalles-routing.module';

import { DetallesPage } from './detalles.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPageRoutingModule,
    NgbModule
  ],
  declarations: [DetallesPage]
})
export class DetallesPageModule {}
