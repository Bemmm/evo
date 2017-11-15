import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/shared/models';
import { UserService } from 'app/core/services';

@Injectable()
export class IsUserLoggedIn implements CanActivate {
    private currentUser: User;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.userService.get()
            .subscribe(user => this.currentUser = user);
    }

    IsUserLoggedIn(): boolean {
        return this.currentUser.isLogged;
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        if (this.IsUserLoggedIn()) {
            return true;
        }

        this.router.navigateByUrl('/login');

        return false;
    }
}
