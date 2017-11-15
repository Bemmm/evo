import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserActions } from 'app/shared/store/user';
import { LocalStorageService } from 'app/core/services';
import { User, UserInfo, AppState } from 'app/shared/models';
import { userRoles } from 'app/shared/constants';

@Injectable()
export class UserService {
    private storageKey = 'jpix-u';

    constructor(
        private store: Store<AppState>,
        private userActions: UserActions,
        private localStorageService: LocalStorageService
    ) {
        this.load();
    }

    load(): User {
        const userInfo: UserInfo = this.localStorageService.getItem(this.storageKey, true);

        if (!userInfo) {
            return;
        }

        const user = new User(
            userInfo.firstname,
            userInfo.lastname,
            userInfo.username,
            userInfo.roles,
            userInfo.isLogged
        );

        this.add(user);
    }

    save(user: User) {
        this.localStorageService.setItem(this.storageKey, user, true);
        this.add(user);
    }

    get(): Observable<User> {
        return this.store.select(appState => appState.user);
    }

    add(user: User) {
        this.userActions.add(user);
    }

    remove() {
        this.localStorageService.removeItem(this.storageKey);
        this.userActions.remove();
    }

    isConsumerCare(roles: string[] = []): boolean {
        return roles.indexOf(userRoles.CONSUMER_CARE) !== -1;
    }

    isSuperviser(roles: string[] = []): boolean {
        return roles.indexOf(userRoles.SUPERVISER) !== -1;
    }

}