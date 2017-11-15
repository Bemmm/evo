import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ApiService, ConsumerCareService } from 'app/core/services';
import { BillingAndShippingModel, ProductConfiguration } from 'app/shared/models';

@Injectable()
export class CheckoutService {
    private apiServiceUrl: string = '';

    constructor(
        private api: ApiService,
        private consumerCareService: ConsumerCareService
    ) { }

    get(requestId: string, params?: any): Observable<any> {
        return this.api.get(this.apiServiceUrl + requestId, params);
    }

    post(requestId: string, params?: any): Observable<any> {
        return this.api.post(this.apiServiceUrl + requestId, params);
    }

    saveData(data: any): Observable<any> {
        return this.api.post('billingAndShipping', data);
    }

    delete(requestId: string, params?: any): Observable<any> {
        return this.api.delete(this.apiServiceUrl + requestId, params);
    }

    applyPromotionCode(code: any): Observable<any> {
        return this.api.get(`promotionCode/${code}`);
    }

    deletePromotionCode(): Observable<any> {
        return this.api.delete('promotionCode');
    }

    getEventProductCatalogByGuid(guid: string, type: string): Observable<{ product: ProductConfiguration }> {
        return this.api.get(`eventProductCatalogByGuid/${guid}/${type}`);
    }

    getEventProductCatalogByPhotoSessionKey(psk: string, type: string): Observable<{ product: ProductConfiguration }> {
        return this.api.get(`eventProductCatalogByPhotoSessionKey/${psk}/${type}`);
    }

    getEventProductCatalogByPhotoKey(photoKey: string, type: string): Observable<{ product: ProductConfiguration }> {
        return this.api.get(`eventProductCatalogByPhotoKey/${photoKey}/${type}`);
    }

    purchaseCurrentOrder(): Observable<any> {
        return this.api.get('purchaseCurrentOrder', {});
    }

    getConsumerCareEventProductCatalogByGuid(guid: string, type: string): Observable<any> {
        return this.consumerCareService.getEventProductCatalogByGuid(guid, type);
    }

    getConsumerCareEventProductCatalogByPhotoSessionKey(psk: string, type: string): Observable<any> {
        return this.consumerCareService.getEventProductCatalogByPhotoSessionKey(psk, type);
    }

    getConsumerCareEventProductCatalogByPhotoKey(photoKey: string, type: string): Observable<any> {
        return this.consumerCareService.getEventProductCatalogByPhotoKey(photoKey, type);
    }
}