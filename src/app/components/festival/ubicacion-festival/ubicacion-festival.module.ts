import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UbicacionFestivalPage } from './ubicacion-festival.page';

const routes: Routes = [
  {
    path: '',
    component: UbicacionFestivalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UbicacionFestivalPage]
})
export class UbicacionFestivalPageModule {}
