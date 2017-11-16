import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { Ng2CompleterModule } from 'ng2-completer';
import { DropdownModule } from 'ngx-dropdown';

import { rootReducer } from './store/rootReducer';

import { SelectedPhotosActions } from './store/selected-photos';
import { CartActions } from './store/cart';
import { UserActions } from './store/user';

// import * as components from './components';
import * as directives from './directives';
import * as validators from './validators';
import { mapObjectToArray } from './helpers';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        RouterModule,
        SwiperModule.forRoot({}),
        StoreModule.provideStore(rootReducer),
        EffectsModule,
        Ng2CompleterModule,
        StoreDevtoolsModule.instrumentOnlyWithExtension({
            maxAge: 5
        }),
        DropdownModule
    ],
    declarations: [
        // mapObjectToArray(components),
        mapObjectToArray(directives),
    ],
    providers: [
        SelectedPhotosActions,
        CartActions,
        UserActions
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        RouterModule,
        SwiperModule,
        // mapObjectToArray(components),
        mapObjectToArray(directives),
        Ng2CompleterModule
    ]
})
export class SharedModule { }