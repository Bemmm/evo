import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { ProfileComponent } from 'app/profile/profile.component';
import { ProfileInfoComponent } from 'app/profile/profile-info/profile-info.component';
import { ProfileOrdersComponent } from 'app/profile/profile-orders/profile-orders.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfileOrdersComponent
  ],
  providers: [
  ]
})

export class ProfileModule { }