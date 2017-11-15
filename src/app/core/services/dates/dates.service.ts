import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable()
export class DatesService {
    static MEDIUM_DATE_FORMAT = 'MMMM D, YYYY';

    parse(dateString?: string, format?: string): moment.Moment {
        return moment(dateString, format);
    }

    parseZone(dateString: string): moment.Moment {
        return moment.parseZone(dateString);
    }

    isAfterToday(dateString: string): boolean {
        return moment(dateString).isAfter();
    }

    utc(dateString: moment.MomentInput): moment.Moment {
        return moment.utc(dateString);
    }

}
