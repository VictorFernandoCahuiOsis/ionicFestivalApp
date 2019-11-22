import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MisFestivalesPage } from './mis-festivales.page';

const routes: Routes = [
  {
    path: '',
    component: MisFestivalesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MisFestivalesPage]
})
export class MisFestivalesPageModule {}
