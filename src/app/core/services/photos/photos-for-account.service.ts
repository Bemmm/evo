import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ApiService, ConsumerCareService } from 'app/core/services';
import { PhotoCard, PhotosForAccount, PhotoDetails } from 'app/shared/models';
import { Observable } from 'rxjs/Observable';

const sortResponse = (currentPhoto: PhotoCard, nextPhoto: PhotoCard) => {
    if (!currentPhoto.personalizationDocumentId && nextPhoto.personalizationDocumentId) {
        return 1;
    }

    if (currentPhoto.personalizationDocumentId && !nextPhoto.personalizationDocumentId) {
        return -1;
    }

    return currentPhoto.studentName < nextPhoto.studentName ? 1 : -1;
};
const flatResponse = (photos: any) => {
    const result: PhotoCard[] = [];
    const eventNames: any = {};
    const eventEffectiveStartDates:any = [];
    const studentNames: any = {};
    const venues: any = {};
    const freeDigitalDownloadOrderThreshold: number = photos.freeDigitalDownloadOrderThreshold || 0;

    photos && photos.schools && photos.schools.forEach((school: any) => {
        const schoolName = school.name;
        const schoolNumber = school.number;

        school.events.forEach((event: any) => {
            const eventName = event.name;
            const eventKey = event.key;
            const eventCode = event.code;
            const eventYear = event.year;
            eventEffectiveStartDates.push(event.effectiveStartDate);
            eventNames[eventCode] = `${eventName} / ${schoolName}`;

            if (!venues[schoolNumber]) {
                venues[schoolNumber] = {
                    schoolName,
                    venues: []
                };
            }

            venues[schoolNumber].venues = [
                ...venues[schoolNumber].venues,
                ...event.venues
                    .filter((venue: any) => venue.date)
                    .map((venue: any) => Object.assign(venue, { schoolName, schoolNumber }))
            ];

            event.subjects.forEach((subject: any) => {
                const studentName = subject.name;
                const studentKey = subject.subjectId.toString();
                studentNames[studentKey] = studentName;

                subject.photos.forEach((photo: any) => {
                    result.push({
                        id: `${photo.photoKey}${photo.personalizationDocumentId ? '-' + photo.personalizationDocumentId : ''}`,
                        guid: photo.guid,
                        url: photo.url,
                        prepurchase: photo.prepurchase,
                        sessionKey: photo.photoSessionKey,
                        photoKey: photo.photoKey,
                        pose: photo.pose,
                        type: photo.type,
                        personalizationDocumentId: photo.personalizationDocumentId,
                        studentName,
                        studentKey,
                        schoolName,
                        eventName,
                        eventKey,
                        eventCode,
                        eventYear
                    });
                })
            })
        })
    });

    // console.log(result, result.sort(sortResponse));

    return {
        list: result.sort(sortResponse),
        eventNames,
        eventEffectiveStartDates,
        studentNames,
        venues,
        freeDigitalDownloadOrderThreshold
    };
}

@Injectable()
export class PhotosForAccountService {
    constructor(
        private api: ApiService,
        private consumerCareService: ConsumerCareService
    ) { }

    getPhotos(): Observable<any> {
        return this.api.get('photosForAccount')
            .map(flatResponse);
    }

    getPhotoByGuid(guid: string, type: string): Observable<PhotoDetails> {
        return this.api.get(`photoDetailsByGuid/${guid}/${type}`);
    }

    getPhotoByPhotoSessionKey(psk: string, type: string): Observable<PhotoDetails> {
        return this.api.get(`photoDetailsByPhotoSessionKey/${psk}/${type}`);
    }

    getPhotoByPhotoKey(photoKey: string, type: string): Observable<PhotoDetails> {
        return this.api.get(`photoDetailsByPhotoKey/${photoKey}/${type}`);
    }

    getConsumerCarePhotosForSubject(subjectId: string, eventCode: string) {
        return this.consumerCareService.getPhotosForSubject(subjectId, eventCode)
            .map(flatResponse);
    }

}