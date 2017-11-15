import { Component, Input, OnInit } from '@angular/core';

import { DatesService } from 'app/core/services';

@Component({
    selector: 'jpix-blank-list-message',
    templateUrl: './blank-list-message.component.html',
    styleUrls: ['./blank-list-message.component.scss']
})
export class BlankListMessageComponent implements OnInit {
    @Input() effectiveStartDate: any;
    eventIsNotActive: boolean = false;

    constructor(private datesService: DatesService) { }

    ngOnInit() {
        this.checkEffectiveStartDate();
        this.effectiveStartDate = this.datesService.parse(this.effectiveStartDate).format('MMM D, YYYY h:mm A');
    }

    checkEffectiveStartDate() {
        if (!this.effectiveStartDate) {
            this.eventIsNotActive = false;
            return;
        }
        this.eventIsNotActive = this.datesService.isAfterToday(this.effectiveStartDate);
    }
}