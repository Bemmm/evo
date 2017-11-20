import { NgModule } from '@angular/core';

import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { mapObjectToArray } from 'app/shared/helpers';

import { HomeComponent } from './home.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent,
        ErrorComponent
    ],
    entryComponents: [
    ],
    providers: [],
    exports: [HomeComponent]
})
export class HomeModule { }