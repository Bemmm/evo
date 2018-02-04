import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateGuest, IsUserLoggedIn } from 'app/core/services';


import { HomeComponent } from './home.component';
import { ErrorComponent } from './error/error.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from 'app/profile/profile.component';
import { LogoutComponent } from 'app/core/components/logout/logout.component';
const homeRoutes: Routes = [
    {
        path: '',
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
        path: 'profile/:id',
        component: ProfileComponent
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