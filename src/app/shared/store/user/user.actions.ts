import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createAction } from './../createAction';

@Injectable()
export class UserActions {

    static ADD = 'user/ADD';
    static REMOVE = 'user/REMOVE';

    constructor(
        private store: Store<any>,
    ) { }

    add(user: any) {
        this.store.dispatch(createAction(UserActions.ADD, user));
    }

    remove() {
        this.store.dispatch(createAction(UserActions.REMOVE));
    }

}