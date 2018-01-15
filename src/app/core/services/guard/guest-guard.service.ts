import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from 'app/core/services';

@Injectable()
export class CanActivateGuest implements CanActivate {
    private currentUser: any;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.userService.get()
            .subscribe(user => this.currentUser = user);
    }

    hasPermissons(): boolean {
        return this.currentUser.isConsumerCare() || this.currentUser.isSuperviser();
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        if (this.hasPermissons()) {
            return true;
        }

        this.router.navigateByUrl('/login');

        return false;
    }
}
