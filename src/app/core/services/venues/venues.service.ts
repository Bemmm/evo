import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class VenuesService {
    venueTypes = {
        RETAKE: 'retake',
        PHOTODAY: 'photoday'
    };

    constructor(private datePipe: DatePipe) { }

    isRetake(venueType: string): boolean {
        return venueType === this.venueTypes.RETAKE;
    }

    isPhotoDay(venueType: string): boolean {
        return venueType === this.venueTypes.PHOTODAY;
    }

    getMessage(venue: any): string {
        if (!venue.date) {
            return;
        }

        if (this.isRetake(venue.type)) {
            return this.getRetakeMessage(venue);
        }

        if (this.isPhotoDay(venue.type)) {
            return this.getPhotoDayMessage(venue);
        }
    }

    transformDate(date: number): string {
        return this.datePipe.transform(date, 'longDate');
    }

    getRetakeMessage(venue: any): string {
        return `${this.transformDate(venue.date)} - ${venue.startTime} (Retake)`;
    }

    getPhotoDayMessage(venue: any): string {
        return `${this.transformDate(venue.date)} - ${venue.startTime}`;
    }

}