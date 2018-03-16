import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';


@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    NoopAnimationsModule,
    NgbModule.forRoot(),
    CoreModule,
    HomeModule,
    AppRoutingModule,
    AuthModule,
    ProfileModule
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
