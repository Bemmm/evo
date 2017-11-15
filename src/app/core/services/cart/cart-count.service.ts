import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from 'app/shared/models';

@Injectable()
export class CartCountService {

    constructor(
        private store: Store<AppState>
    ) { }

    getCount(): Observable<number> {
        return this.store.select(appState => appState.cartCount);
    }

}