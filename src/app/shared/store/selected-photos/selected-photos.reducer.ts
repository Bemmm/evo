import { Action } from '@ngrx/store';

import { PhotoCard } from 'app/shared/models';
import { SelectedPhotosActions } from './selected-photos.actions'

const initialState: PhotoCard[] = [];

export function selectedPhotosReducer(state = initialState, action: Action): PhotoCard[] {
    switch (action.type) {
        case SelectedPhotosActions.ADD: {
            return [action.payload];
        }

        case SelectedPhotosActions.REMOVE: {
            return state.filter((photo: PhotoCard) => action.payload.guid !== photo.guid);
        }

        case SelectedPhotosActions.CLEAR: {
            return initialState;
        }

        case SelectedPhotosActions.LOAD: {
            return action.payload;
        }

        default:
            return state;
    }
}