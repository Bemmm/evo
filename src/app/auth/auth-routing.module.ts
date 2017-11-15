import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AuthComponent,
                children: [
                    {
                        path: 'login',
                        component: LoginComponent
                    },
                    {
                        path: 'activateAccount',
                        component: LoginComponent,
                        data: {
                            activateAccountMode: true
                        }
                    },
                    {
                        path: 'register',
                        component: RegisterComponent
                    },
                    {
                        path: 'passwordReset',
                        component: ResetPasswordComponent
                    },
                ]
            },
            {
                path: '**',
                redirectTo: 'preview',
                pathMatch: 'full'
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }