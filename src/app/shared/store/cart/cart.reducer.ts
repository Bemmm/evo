import { Action } from '@ngrx/store';

import { CartActions } from './cart.actions'

const initialState: number = 0;

export function cartReducer(state = initialState, action: Action): number {
    switch (action.type) {
        case CartActions.INCREMENT_COUNT: {
            return state + 1;
        }

        case CartActions.DECREMENT_COUNT: {
            return state - 1;
        }

        case CartActions.CLEAR_COUNT: {
            return initialState;
        }

        case CartActions.LOAD_COUNT: {
            return action.payload;
        }

        case CartActions.SET_COUNT: {
            return action.payload;
        }

        default:
            return state;
    }
}