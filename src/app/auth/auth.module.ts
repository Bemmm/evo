import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CoreModule } from 'app/core/core.module';
import { mapObjectToArray } from 'app/shared/helpers';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
    imports: [
        AuthRoutingModule,
        SharedModule,
        CoreModule
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent
    ],
    exports: [
        AuthComponent
    ]
})
export class AuthModule { }