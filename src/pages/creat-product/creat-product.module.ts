import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatProductPage } from './creat-product';

@NgModule({
  declarations: [
    CreatProductPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatProductPage),
  ],
})
export class CreatProductPageModule {}
