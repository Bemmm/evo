import { Component, Input, OnChanges } from '@angular/core';

import { VenuesService } from 'app/core/services';

@Component({
    selector: 'evo-venues',
    templateUrl: './venues.component.html',
    styleUrls: ['./venues.component.scss'],
})
export class VenuesComponent implements OnChanges {
    @Input() venuesMap: any;

    venuesKeys: string[] = [];

    constructor(private venuesService: VenuesService) { }

    ngOnChanges(changes: any) {
        if (!changes['venuesMap'] || !changes['venuesMap'].currentValue) {
            return;
        }

        this.venuesKeys = Object.keys(this.venuesMap);
    }

    getVenueMessage(venue: any): string {
        return this.venuesService.getMessage(venue);
    }
}