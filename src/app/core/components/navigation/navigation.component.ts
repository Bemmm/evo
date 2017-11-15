import { Component, Input, OnInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartCountService } from 'app/core/services';

import { NavigationService } from './navigation.service';
import { NavigationItem } from './navigation-item.model';

@Component({
    selector: 'jpix-nav',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnChanges {
    @Input() disabled: string[] = [];
    @Input() hidden: string[] = [];
    @Input() shown: string[] = [];
    defaultItems: NavigationItem[];
    items: NavigationItem[] = [];
    disableBillingShipping: boolean = false;

    constructor(
        private navigationService: NavigationService,
        private countCartService: CartCountService
    ) {
        this.defaultItems = this.navigationService.getItems();
        this.subscribeOnCartCount();
    }

    subscribeOnCartCount() {
        this.countCartService.getCount()
            .subscribe(count => {
                this.disableBillingShipping = !count;
            })
    }

    ngOnChanges(data: any) {
        this.initItems();
    }

    initItems() {
        this.items = this.defaultItems.map((item: NavigationItem) => {
            const disabled = this.disabled.indexOf(item.id) !== -1 || item.disabled || (this.disableBillingShipping && item.id === 'billing-shipping');
            const hidden = this.hidden.indexOf(item.id) !== -1 || item.hidden;
            const shown = this.shown.indexOf(item.id) !== -1 || item.shown;

            return { ...item, disabled, hidden, shown };
        });
    }

    trackItem(index: any, item: NavigationItem) {
        return item ? item.id : undefined;
    }

    onClick(e: Event) {
        console.log(111);
        // e.stopImmediatePropagation();
        return false;
    }

}