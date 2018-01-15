import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Error } from './error.model';
import { ErrorService } from './error.service';

@Component({
    selector: 'evo-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    providers: [ErrorService]
})
export class ErrorComponent implements OnDestroy {
    subscriptions: Subscription[] = [];
    error: Error;

    constructor(
        private route: ActivatedRoute,
        private errorService: ErrorService,
    ) {
        this.getError();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    getError() {
        const subscription = this.route.params
            .subscribe(params => {
                this.error = this.errorService.getError(params['code']);
            });
        this.subscriptions.push(subscription);
    }
}