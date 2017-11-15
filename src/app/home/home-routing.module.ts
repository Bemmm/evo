import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonalizationComponent } from 'app/personalization/personalization.component';
import { BillingShippingComponent } from 'app/checkout/billing-shipping/billing-shipping.component';
import { ReviewOrderComponent } from 'app/checkout/review-order/review-order.component';
import { OrderConfirmationComponent } from 'app/checkout/order-confirmation/order-confirmation.component';
import { PrePurchaseComponent } from 'app/checkout/pre-purchase/pre-purchase.component';
import { OrderByAccountComponent } from 'app/orders/order-by-account/order-by-account.component';
import { UpdateOrderComponent } from 'app/orders/update-order/update-order.component';
import { ContactComponent } from 'app/info-pages/contact/contact.component';
import { ReturnPolicyComponent } from 'app/info-pages/return-policy/return-policy.component';
import { FaqsComponent } from 'app/info-pages/faqs/faqs.component';

import { CanActivateGuest, CanActivateConsumer, IsUserLoggedIn } from 'app/core/services';
import { consumerCareRoutes} from 'app/consumer-care-portal/consumer-care-portal.routes';

import { HomeComponent } from './home.component';
import { PreviewComponent } from './preview/preview.component';
import { FindStudentComponent } from './find-student/find-student.component';
import { ErrorComponent } from './error/error.component';

const homeRoutes: Routes = [
    {
        path: 'preview',
        component: PreviewComponent,
        data: {
            hasSearchLink: true
        },
        canActivate: [CanActivateConsumer, IsUserLoggedIn]
    },
    {
        path: 'guest/preview/:eventCode/:subjectId',
        component: PreviewComponent,
        data: {
            isGuestMode: true
        },
        canActivate: [CanActivateGuest]
    },
    {
        path: 'personalize',
        component: PersonalizationComponent,
        canActivate: [CanActivateConsumer]
    },
    {
        path: 'personalize/prints',
        component: PersonalizationComponent,
        data: {
            isPrintsMode: true
        },
        canActivate: [CanActivateConsumer]

    },
    {
        path: 'personalize/edit/:id',
        component: PersonalizationComponent,
        data: {
            isEditMode: true
        },
        canActivate: [CanActivateConsumer]
    },
    {
        path: 'guest/purchase',
        component: PersonalizationComponent,
        data: {
            isGuestMode: true
        },
        canActivate: [CanActivateGuest]
    },
    {
        path: 'guest/purchase/edit/:id',
        component: PersonalizationComponent,
        data: {
            isGuestMode: true,
            isEditMode: true
        },
        canActivate: [CanActivateGuest]
    },
    {
        path: 'review-order',
        component: ReviewOrderComponent
    },
    {
        path: 'billing-shipping',
        component: BillingShippingComponent
    },
    {
        path: 'order-confirmation/:orderNumber',
        component: OrderConfirmationComponent
    },
    {
        path: 'order-by-account',
        component: OrderByAccountComponent
    },
    {
        path: 'update-order/:orderNumber',
        component: UpdateOrderComponent
    },
    {
        path: 'find-student',
        component: FindStudentComponent
    },
    {
        path: 'pre-purchase',
        component: PrePurchaseComponent
    },
    {
        path: 'pre-purchase/:mode/:id',
        component: PrePurchaseComponent
    },
    {
        path: 'order-by-account',
        component: OrderByAccountComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    },
    {
        path: 'error/:code',
        component: ErrorComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'return-policy',
        component: ReturnPolicyComponent
    },
    {
        path: 'faqs',
        component: FaqsComponent
    },
    ...consumerCareRoutes
];

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent,
                children: homeRoutes
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }