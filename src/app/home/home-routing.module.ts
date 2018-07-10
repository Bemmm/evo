import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateGuest, IsUserLoggedIn } from 'app/core/services';


import { HomeComponent } from './home.component';
import { ErrorComponent } from './error/error.component';
import { MapComponent } from './map/map.component';
import { AuthComponent } from 'app/auth/auth.component';
import { RegisterComponent } from 'app/auth/register/register.component';
import { LoginComponent } from 'app/auth/login/login.component';
import { ProfileComponent } from 'app/profile/profile.component';
import { ProfileInfoComponent } from 'app/profile/profile-info/profile-info.component';
import { ProfileDriversComponent } from 'app/profile/profile-drivers/profile-drivers.component';
import { ProfileOrdersComponent } from 'app/profile/profile-orders/profile-orders.component';
import { ProfileTrucksComponent } from 'app/profile/profile-trucks/profile-trucks.component';
import { LogoutComponent } from 'app/core/components/logout/logout.component';
import { LandingComponent } from 'app/landing/landing.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'error/:code',
    component: ErrorComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        data: { title: 'Реєстрація' }
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Вхід' }
      }
    ]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      {
        path: 'info',
        component: ProfileInfoComponent
      },
      {
        path: 'drivers',
        component: ProfileDriversComponent
      },
      {
        path: 'orders',
        component: ProfileOrdersComponent
      },
      {
        path: 'trucks',
        component: ProfileTrucksComponent
      },
    ]
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: homeRoutes
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
