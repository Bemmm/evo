import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, PhotoCard } from 'app/shared/models';
import { createAction } from './../createAction';


@Injectable()
export class SelectedPhotosActions {

    static ADD = 'selected-photos/ADD';
    static REMOVE = 'selected-photos/REMOVE';
    static CLEAR = 'selected-photos/CLEAR';
    static LOAD = 'selected-photos/LOAD';

    constructor(
        private store: Store<AppState>) { }

    add(photo: PhotoCard) {
        this.store.dispatch(createAction(SelectedPhotosActions.ADD, photo));
    }

    remove(photo: PhotoCard) {
        this.store.dispatch(createAction(SelectedPhotosActions.REMOVE, photo));
    }

    clear() {
        this.store.dispatch(createAction(SelectedPhotosActions.CLEAR));
    }

    load(photos: PhotoCard[]) {
        this.store.dispatch(createAction(SelectedPhotosActions.LOAD, photos));
    }

}