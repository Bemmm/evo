import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateGuest, IsUserLoggedIn } from 'app/core/services';


import { HomeComponent } from './home.component';
import { ErrorComponent } from './error/error.component';
import { MapComponent } from './map/map.component';

const homeRoutes: Routes = [
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: 'error/:code',
        component: ErrorComponent
    },
    {
        path: 'home',
        component: MapComponent
    }    
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