import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { ProfileTrucksComponent } from './profile-trucks/profile-trucks.component';
import { ProfileDriversComponent } from './profile-drivers/profile-drivers.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    ProfileOrdersComponent,
    ProfileTrucksComponent,
    ProfileDriversComponent
  ],
  providers: [
  ]
})

export class ProfileModule { }
