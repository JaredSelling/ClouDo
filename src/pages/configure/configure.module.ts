import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfigurePage } from './configure';

@NgModule({
  declarations: [
    ConfigurePage,
  ],
  imports: [
    IonicPageModule.forChild(ConfigurePage),
  ],
  exports: [
    ConfigurePage
  ]
})
export class ConfigurePageModule {}
