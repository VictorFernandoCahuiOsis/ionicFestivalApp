import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DescripcionMiFestivalPage } from './descripcion-mi-festival.page';

const routes: Routes = [
  {
    path: '',
    component: DescripcionMiFestivalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DescripcionMiFestivalPage]
})
export class DescripcionMiFestivalPageModule {}
