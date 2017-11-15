import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

import { SharedModule } from 'app/shared/shared.module';
import { mapObjectToArray } from 'app/shared/helpers';

import { throwIfAlreadyLoaded } from './module-import-guard';
import * as components from './components';
import * as services from './services';
import { NavigationService } from './components/navigation/navigation.service';

@NgModule({
    imports: [
        HttpModule,
        SharedModule
    ],
    declarations: [
        ...mapObjectToArray(components),
    ],
    providers: [
        NavigationService,
        ...mapObjectToArray(services),
        DatePipe,
        CurrencyPipe,
        ToastsManager,
        ToastOptions
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
