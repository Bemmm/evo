import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";
import { StoreModule } from '@ngrx/store';
import { InputTextModule, DropdownModule } from 'primeng/primeng';
import { rootReducer } from './store/rootReducer';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
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
        InputTextModule,
        DropdownModule,
        StoreModule.forRoot(rootReducer, {}),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAJDovioj36qSMAHr2LCpy3rmlcPxVevuM'
          }),
          AgmSnazzyInfoWindowModule          
    ],
    declarations: [
        // mapObjectToArray(components),
        mapObjectToArray(directives),
    ],
    providers: [
        UserActions
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        RouterModule,
        InputTextModule,
        DropdownModule,        
        StoreModule,
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,        
        // mapObjectToArray(components),
        mapObjectToArray(directives),
    ]
})
export class SharedModule { }