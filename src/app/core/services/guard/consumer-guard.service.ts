import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { User } from 'app/shared/models';
import { UserService, PreviewParamsService } from 'app/core/services';

@Injectable()
export class CanActivateConsumer implements CanActivate {
    private currentUser: User;

    constructor(
        private userService: UserService,
        private router: Router,
        private previewParamsService: PreviewParamsService
    ) {
        this.userService.get()
            .subscribe(user => this.currentUser = user);
    }

    isConsumareCare(): boolean {
        return this.currentUser.isConsumerCare();
    }

    handleConsumerCare(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const params = this.previewParamsService.get();

        if (state.url === '/preview' && params && params.eventCode && params.subjectId) {
            this.router.navigate(['guest/preview', params.eventCode, params.subjectId]);
            return;
        }

        const regexp = new RegExp('^/personalize/edit/');

        if (regexp.exec(state.url) && route.url[2]) {
            this.router.navigate(['guest/purchase/edit', route.url[2].path]);
            return;
        }

        this.router.navigateByUrl('/consumer-care');
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.isConsumareCare()) {
            return true;
        }

        if (this.isConsumareCare()) {
            this.handleConsumerCare(route, state);
            return false;
        }

        this.router.navigateByUrl('/login');

        return false;
    }
}
