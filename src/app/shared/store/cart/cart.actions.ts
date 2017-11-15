import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'app/shared/models';
import { CartService } from 'app/core/services';
import { createAction } from './../createAction';


@Injectable()
export class CartActions {

    static INCREMENT_COUNT = 'cart/INCREMENT_COUNT';
    static DECREMENT_COUNT = 'cart/DECREMENT_COUNT';
    static CLEAR_COUNT = 'cart/CLEAR_COUNT';
    static LOAD_COUNT = 'cart/LOAD_COUNT';
    static SET_COUNT = 'cart/SET_COUNT';

    constructor(
        private store: Store<AppState>,
        private cartService: CartService
    ) { }

    incrementCount() {
        this.store.dispatch(createAction(CartActions.INCREMENT_COUNT));
    }

    decrementCount() {
        this.store.dispatch(createAction(CartActions.DECREMENT_COUNT));
    }

    clearCount() {
        this.store.dispatch(createAction(CartActions.CLEAR_COUNT));
    }

    loadCount() {
        this.cartService.getOrderItemsCount()
            .subscribe(res => {
                const itemsCount = res && res.itemCount || 0;
                this.store.dispatch(createAction(CartActions.LOAD_COUNT, itemsCount));
            });
    }

    setCount(itemsCount: number) {
        this.store.dispatch(createAction(CartActions.SET_COUNT, itemsCount));
    }

}