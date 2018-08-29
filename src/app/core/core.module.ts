import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { mapObjectToArray } from '../shared/helpers';

import { throwIfAlreadyLoaded } from './module-import-guard';
import * as components from './components';
import * as services from './services';

@NgModule({
    imports: [
        HttpModule,
        SharedModule
    ],
    declarations: [
        ...mapObjectToArray(components),
    ],
    providers: [
        ...mapObjectToArray(services),
        DatePipe,
        CurrencyPipe
    ],
    exports: [
        HttpModule,
        ...mapObjectToArray(components)
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
