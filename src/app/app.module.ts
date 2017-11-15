import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr/ng2-toastr';


import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';


@NgModule({
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        NgbModule.forRoot(),
        CoreModule,
        AppRoutingModule,
        HomeModule,
        AuthModule,
        SharedModule,
        ToastModule.forRoot()
    ],
    declarations: [
        AppComponent
    ],
    providers: [DatePipe],
    exports: [AppComponent],
    entryComponents: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }