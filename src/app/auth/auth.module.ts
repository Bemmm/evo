import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { mapObjectToArray } from '../shared/helpers';

import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        SharedModule,
        CoreModule
    ],
    declarations: [
        AuthComponent,
        RegisterComponent,
        LoginComponent
    ],
    exports: [
        AuthComponent
    ]
})
export class AuthModule { }
