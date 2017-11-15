import { NgModule } from '@angular/core';

import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { CheckoutModule } from 'app/checkout/checkout.module';
import { PersonalizationModule } from 'app/personalization/personalization.module';
import { OrdersModule } from 'app/orders/orders.module';
import { HomeRoutingModule } from './home-routing.module';
import { InfoPagesModule } from 'app/info-pages/info-pages.module';
import { mapObjectToArray } from 'app/shared/helpers';
import { ConsumerCarePortalModule } from 'app/consumer-care-portal/consumer-care-portal.module';

import { HomeComponent } from './home.component';
import * as previewComponents from './preview';
import * as findStudentComponents from './find-student';
import { ErrorComponent } from './error/error.component';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        HomeRoutingModule,
        CheckoutModule,
        PersonalizationModule,
        OrdersModule,
        InfoPagesModule,
        ConsumerCarePortalModule
    ],
    declarations: [
        HomeComponent,
        mapObjectToArray(previewComponents),
        mapObjectToArray(findStudentComponents),
        ErrorComponent
    ],
    entryComponents: [
        findStudentComponents.AddStudentModalComponent
    ],
    providers: [],
    exports: [HomeComponent]
})
export class HomeModule { }