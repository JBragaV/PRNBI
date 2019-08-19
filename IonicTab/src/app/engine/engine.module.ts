import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnginePage } from './engine.page';
import { FotoFuelPageModule } from './foto-fuel/foto-fuel.module';

const routes: Routes = [
  {
    path: '',
    component: EnginePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FotoFuelPageModule
  ],
  declarations: [EnginePage]
})
export class EnginePageModule {}
