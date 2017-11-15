import { Injectable } from '@angular/core';

import { NavigationItem } from './navigation-item.model';

@Injectable()
export class NavigationService {
    private items: NavigationItem[] = [
        {
            id: 'preview',
            title: 'Your Photos',
            link: ['/preview']
        },
        {
            id: 'personalize',
            title: 'Personalize',
            link: ['/personalize']
        },
        {
            id: 'pre-purchase',
            title: 'Order prints',
            link: ['/pre-purchase'],
            hidden: true
        },
        {
            id: 'purchase',
            title: 'Purchase',
            link: ['/guest/purchase'],
            hidden: true
        },
        {
            id: 'review-order',
            title: 'Review Order',
            link: ['/review-order']
        },
        {
            id: 'billing-shipping',
            title: 'Checkout',
            link: ['/billing-shipping']
        },
        {
            id: 'receipt',
            title: 'Receipt',
            link: ['/order-confirmation']
        }
    ];

    getItems(): NavigationItem[] {
        return this.items;
    }

};