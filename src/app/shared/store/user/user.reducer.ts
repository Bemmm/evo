import { Action } from '@ngrx/store';

import { UserActions } from './user.actions'

const initialState: any = null;

export function userReducer(state = initialState, action: any): any {
    switch (action.type) {
        case UserActions.ADD: {
            return action.payload;
        }

        case UserActions.REMOVE: {
            return initialState;
        }

        default:
            return state;
    }
}