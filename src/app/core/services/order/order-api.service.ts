import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ApiService } from 'app/core/services';

@Injectable()
export class OrderApiService {

    constructor(
        private api: ApiService
    ) { }

    getOrderHTMLTemplateByOrderNumber(orderNumber: string): Observable<any> {
        return this.api.get(`orderConfirmation/${orderNumber}`);
    }

    getOrderInformationByOrderNumber(orderNumber: string): Observable<any> {
        return this.api.get(`orderInformation/${orderNumber}`);
    }

    // searchOrder(data: any): Observable<any> {
    //     return this.api.post('consumerCare/searchOrder', data);
    // }

    searchOrder(data: any, pageIndex:number): Observable<any> {
        return this.api.post(`consumerCare/pageableSearchOrder?pageIndex=${pageIndex}`, data);
    }

    getOrderHistory(): Observable<any> {
        return this.api.get('orderHistory');
    }

    applyDiscount(orderNumber: string, amount: string): Observable<any> {
        return this.api.get(`internalDiscount/${orderNumber}/${amount}`)
    }

    holdOrder(orderNumber: string): Observable<any> {
        return this.api.get(`orderHold/${orderNumber}`);
    }

    completeOrder(orderNumber: string): Observable<any> {
        return this.api.get(`orderComplete/${orderNumber}`)
    }

    getCommentsByOrderNumber(orderNumber: string): Observable<any> {
        return this.api.get(`orderComments/${orderNumber}`)
    }

    addOrderComment(orderNumber: string, comment: string): Observable<any> {
        return this.api.post(`orderComment/${orderNumber}`, { 'comment': comment });
    }

    purchaseOrderByNumber(orderNumber: string): Observable<any> {
        return this.api.get(`consumerCare/purchaseOrder/${orderNumber}`)
    }

    applyDiscountForBalanceOwing(orderNumber: string): Observable<any> {
        return this.api.post(`consumerCare/discountForBalanceOwing/${orderNumber}`, {});
    }

    issueFullRefundAndCancel(orderNumber: string): Observable<any> {
        return this.api.post(`consumerCare/issueFullRefundAndCancel/${orderNumber}`, {});
    }

    issueRefund(orderNumber: string, refundAmount: number): Observable<any> {
        return this.api.post(`consumerCare/issueRefund/${orderNumber}?refundAmount=${refundAmount}`, {});
    }

    cancelOrder(orderNumber: string): Observable<any> {
        return this.api.post(`consumerCare/cancelOrder/${orderNumber}`, {});
    }

    getOrderStatusInfo(): Observable<any> {
        return this.api.get('orderStatusSpaces');
    }

    getFulfillmentStatusInfo(): Observable<any> {
        return this.api.get('fulfillmentStatusSpaces');
    }
}