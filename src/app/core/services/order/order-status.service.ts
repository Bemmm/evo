import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { OrderApiService } from 'app/core/services';

@Injectable()
export class OrderStatusService {
    private orderStatuses: any;
    private fulfillmentStatuses: any;

    constructor(
        private orderApiService: OrderApiService
    ) { }

    getOrderStatuses(): Observable<any> {
        if (!this.orderStatuses) {
            return this.orderApiService.getOrderStatusInfo()
                .do(res => {
                    this.orderStatuses = res;
                });
        }
        return Observable.of(this.orderStatuses);
    }

    getFulfillmentStatuses(): Observable<any> {
        if (!this.fulfillmentStatuses) {
            return this.orderApiService.getFulfillmentStatusInfo()
                .do(res => {
                    this.fulfillmentStatuses = res;
                });
        }
        return Observable.of(this.fulfillmentStatuses);
    }
}

