import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, User } from 'app/shared/models';
import { createAction } from './../createAction';

@Injectable()
export class UserActions {

    static ADD = 'user/ADD';
    static REMOVE = 'user/REMOVE';

    constructor(
        private store: Store<AppState>,
    ) { }

    add(user: User) {
        this.store.dispatch(createAction(UserActions.ADD, user));
    }

    remove() {
        this.store.dispatch(createAction(UserActions.REMOVE));
    }

}