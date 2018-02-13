import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserActions } from 'app/shared/store/user';
import { LocalStorageService } from 'app/core/services';

@Injectable()
export class UserService {
    private storageKey = 'evo-u';

    constructor(
        private store: Store<any>,
        private userActions: UserActions,
        private localStorageService: LocalStorageService
    ) {
        this.load();
    }

    load(): any {
        const userInfo: any = this.localStorageService.getItem(this.storageKey, true);
        if (!userInfo) {
            return;
        }

        this.add(userInfo);
    }
    save(user: any) {
        this.localStorageService.setItem(this.storageKey, user, true);
        this.add(user);
    }

    get(): Observable<any> {
        return this.store.select(appState => appState.user);
    }

    add(user: any) {
        this.userActions.add(user);
    }

    remove() {
        this.localStorageService.removeItem(this.storageKey);
        this.userActions.remove();
    }

}
