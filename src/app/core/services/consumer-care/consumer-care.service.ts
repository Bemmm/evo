import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ApiService } from 'app/core/services';
import { UserAccountInfo } from 'app/shared/models';
import { objectToURLSearchParams } from 'app/shared/helpers';

@Injectable()
export class ConsumerCareService {
    private apiServiceUrl: string = 'consumerCare';

    constructor(private api: ApiService) { }

    getEventBySchool(customerNumber: string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/schoolEvents/${customerNumber}`);
    }

    getStudentByEvent(eventId: string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/eventStudents/${eventId}`);
    }

    getEventForStudent(studentId: string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/studentEvents/${studentId}`);
    }

    getStudentEmails(studentId: string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/studentEmails/${studentId}`);
    }

    sendGuestOrderRequest(subjectId: string, subjectEmail: string, lastOrderNumber: string, updateCurrentOrder: boolean): Observable<any> {
        return this.api.post(`${this.apiServiceUrl}/guestOrder`, {
            updateCurrentOrder,
            lastOrderNumber,
            subjectId,
            subjectEmail
        });
    }

    getPhotosForSubject(subjectId: string, eventCode: string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/photosForSubject/${subjectId}/${eventCode}`);
    }

    getEventProductCatalogByPhotoSessionKey(psk: string, type: string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/eventProductCatalogByPhotoSessionKey/${psk}/${type}`);
    }

    getEventProductCatalogByGuid(guid: string, type: string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/eventProductCatalogByGuid/${guid}/${type}`);
    }

    getEventProductCatalogByPhotoKey(photoKey: string, type: string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/eventProductCatalogByPhotoKey/${photoKey}/${type}`);
    }

    getReport(type: string, params: any): Observable<any> {
        return this.api.get(`PixReporting/${type}`, params);
    }

    getExportReportLinkUrl(type: string, params: any): string {
        const urlParams = objectToURLSearchParams(params);

        return `${this.api.api_url}PixReporting/${type}XLS?${urlParams}`;
    }

    getUser(email: string): Observable<UserAccountInfo> {
        const urlParams = objectToURLSearchParams({ email });

        return this.api.get(`${this.apiServiceUrl}/getUserByEmail?${urlParams}`);
    }

    getComposites(eventCode: string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/composites/${eventCode}`);
    }

    postGenerateComposite(eventCode: string, data: any): Observable<any> {
        return this.api.post(`${this.apiServiceUrl}/generateComposite/${eventCode}`, data);
    }

    getFinalizeComposite(compositeId:string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/composite/${compositeId}/finalize`);
    }
    
    getFreeFacultyOrder(eventCode: string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/freeFacultyOrder/preview/${eventCode}`);
    }
    
    releaseFreeFacultyOrder(eventCode: string): Observable<any> {
        return this.api.get(`${this.apiServiceUrl}/freeFacultyOrder/release/${eventCode}`);
    }

    deleteFreeFacultyOrder(eventCode: string): Observable<any> {
        return this.api.delete(`${this.apiServiceUrl}/freeFacultyOrder/${eventCode}`);
    }

    updateSubject(subjectId: string, data: any): Observable<any> {
        return this.api.put(`${this.apiServiceUrl}/subject/${subjectId}`, data);
    }
}
