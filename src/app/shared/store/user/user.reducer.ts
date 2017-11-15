import { Action } from '@ngrx/store';

import { User } from 'app/shared/models';
import { UserActions } from './user.actions'

const initialState: User = new User('', '', '', [], false);

export function userReducer(state = initialState, action: Action): User {
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