import { Action } from '@ngrx/store';

export function createAction(type: string, payload?: any): any {
    return { type, payload };
}