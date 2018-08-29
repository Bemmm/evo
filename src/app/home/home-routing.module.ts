import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateGuest, IsUserLoggedIn } from '../core/services';


import { HomeComponent } from './home.component';
import { ErrorComponent } from './error/error.component';
import { TrucksComponent } from './trucks/trucks.component';
import { AuthComponent } from '../auth/auth.component';
import { RegisterComponent } from '../auth/register/register.component';
import { LoginComponent } from '../auth/login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileInfoComponent } from '../profile/profile-info/profile-info.component';
import { ProfileDriversComponent } from '../profile/profile-drivers/profile-drivers.component';
import { ProfileOrdersComponent } from '../profile/profile-orders/profile-orders.component';
import { ProfileTrucksComponent } from '../profile/profile-trucks/profile-trucks.component';
import { LogoutComponent } from '../core/components/logout/logout.component';
import { LandingComponent } from '../landing/landing.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'trucks',
    component: TrucksComponent
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
