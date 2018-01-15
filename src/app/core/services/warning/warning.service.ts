import {
    Injectable
} from '@angular/core';
import {
    Subject
} from 'rxjs/Subject';

type Severities = 'success' | 'info' | 'warn' | 'error';

@Injectable()
export class WarningService {
    warningChange: Subject < Object > = new Subject < Object > ();

    show(severity: Severities, summary: string, detail: string) {
        console.log('test');
        this.warningChange.next({
            severity,
            summary,
            detail
        });
    }

}