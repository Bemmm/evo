import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './landing.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LandingComponent
  ],
  providers: [
  ]
})

export class LandingModule { }
