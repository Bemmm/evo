import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import {
    WarningService
} from 'app/core/services';
import {
    Subscription
} from 'rxjs/Subscription';
import { setTimeout } from 'timers';

@Component({
    selector: 'evo-warning',
    templateUrl: './warning.component.html',
    styleUrls: ['./warning.component.scss']
})

export class WarningComponent implements OnInit, OnDestroy {
    msgs: any[] = [];
    subscription: Subscription;

    constructor(private warningService: WarningService) {}

    ngOnInit() {
        this.subscribeToWarnings();
    }

    subscribeToWarnings() {
        this.subscription = this.warningService.warningChange
            .subscribe(warning => {
                this.msgs.length = 0;
                this.msgs.push(warning);
                setTimeout(()=>{
                    this.msgs.length = 0;
                }, 4000)
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}