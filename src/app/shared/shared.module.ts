import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";
import { StoreModule } from '@ngrx/store';
import { InputTextModule, DropdownModule, InputMaskModule, CalendarModule, RadioButtonModule, GrowlModule, TabViewModule, DataTableModule } from 'primeng/primeng';
import { rootReducer } from './store/rootReducer';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { UserActions } from './store/user';
import { MessageService } from 'primeng/components/common/messageservice';
import { AngularGooglePlaceModule } from 'angular-google-place';


import * as components from './components';
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
        InputTextModule,
        DropdownModule,
        InputMaskModule,
        CalendarModule,
        RadioButtonModule,
        GrowlModule,
        TabViewModule,
        DataTableModule,
        StoreModule.forRoot(rootReducer, {}),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAJDovioj36qSMAHr2LCpy3rmlcPxVevuM',
            libraries: ['places']
          }),
          AgmSnazzyInfoWindowModule,
          AngularGooglePlaceModule        
    ],
    declarations: [
        mapObjectToArray(components),
        mapObjectToArray(directives),
    ],
    providers: [
        UserActions,
        MessageService
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        RouterModule,
        InputTextModule,
        DropdownModule,
        InputMaskModule,
        CalendarModule,
        RadioButtonModule,
        GrowlModule,      
        TabViewModule,
        DataTableModule,
        StoreModule,
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
        AngularGooglePlaceModule,        
        mapObjectToArray(components),
        mapObjectToArray(directives),
    ]
})
export class SharedModule { }