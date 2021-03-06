import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AuthComponent,
                children: [
                    {
                        path: 'register',
                        component: RegisterComponent
                    },
                    {
                        path: 'login',
                        component: LoginComponent
                    }                    
                ]
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }