import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CartActions } from 'app/shared/store/cart';
import { CartCountService } from 'app/core/services';

@Component({
    selector: 'jpix-cart-count',
    templateUrl: './cart-count.component.html',
    styleUrls: ['./cart-count.component.scss']
})
export class CartCountComponent implements OnInit {
    orderItemsCount: number = 0;
    cartCount$: Observable<number>;

    constructor(
        private cartActions: CartActions,
        private cartCountService: CartCountService,
        private router: Router
    ) {
        this.cartCount$ = this.cartCountService.getCount();
    }

    ngOnInit() {
        this.cartActions.loadCount();
    }

    navigate(count: any) {
        this.cartCount$
            .first()
            .filter((count) => count > 0)
            .subscribe(() => {
                this.router.navigateByUrl('/review-order')
            });
    }

}