import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { mapObjectToArray } from '../shared/helpers';

import { HomeComponent } from './home.component';
import { TrucksComponent } from './trucks/trucks.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent,
        TrucksComponent,
        ErrorComponent
    ],
    entryComponents: [
    ],
    providers: [],
    exports: [HomeComponent]
})
export class HomeModule { }
