import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from 'app/core/services';
import { PersonalizationState } from 'app/shared/models';

@Injectable() export class PersonalizationApiService {
    constructor(private apiService: ApiService) { }

    personalize(personalizationState: PersonalizationState): Observable<Response> {
        return this.apiService.postWithBlobResponse('personalize', personalizationState);
    }

    personalizedImage(guid: string, ratio: string, personalizationState: PersonalizationState): Observable<Response> {
        return this.apiService.postWithBlobResponse(`photo/personalized/${guid}/${ratio}`, personalizationState);
    }

    getDefaultPersonalization(photoKey: string): Observable<PersonalizationState> {
        return this.apiService.get(`defaultPersonalization/${photoKey}`);
    }

    getPersonalizationDocumentById(personalizationDocumentId: string): Observable<PersonalizationState> {
        return this.apiService.get('personalize', { personalizationDocumentId });
    }

}