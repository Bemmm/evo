import { Injectable } from '@angular/core';

import { OrderItem, PaymentItem, ShipmentItem } from 'app/shared/models';
import { DatePipe } from '@angular/common';
import { PhotoTypesService, DatesService, LocalStorageService, OrderStatusService } from 'app/core/services';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

const ORDER_STATUS = "orderStatus",
    FULFILLMENT_STATUS = "fulfillmentStatus";

@Injectable()
export class OrderService {
    private orderInfo: OrderItem;

    constructor(
        private datePipe: DatePipe,
        private photoTypesService: PhotoTypesService,
        private datesService: DatesService,
        private localStorageService: LocalStorageService,
        private orderStatusService: OrderStatusService
    ) { }

    setOrderInfo(orderInfo: OrderItem) {
        this.orderInfo = orderInfo;
    }

    getOrderInfo(): OrderItem {
        return this.orderInfo;
    }

    getOrderData(): { jpixOrder: OrderItem } {
        return { jpixOrder: this.orderInfo };
    }

    getOrderNumber(): string {
        return this.orderInfo.orderNumber;
    }

    getOrderDate(): string {
        const date = Math.max.apply(
            null,
            this.getOrderPayments().map(payment => this.datesService.parseZone(payment.paymentDate))
        );

        return this.datesService.utc(date).format(DatesService.MEDIUM_DATE_FORMAT);
    }

    getOrderPayments(): PaymentItem[] {
        return this.orderInfo.payments;
    }

    getBillToContactName(payment: PaymentItem): string {
        return `${payment.jpixOrderBillToContact.jpixContact.firstName} ${payment.jpixOrderBillToContact.jpixContact.lastName}`;
    }

    getBillToContactPhone(payment: PaymentItem): string {
        return payment.jpixOrderBillToContact.jpixContact.phoneNumber;
    }

    getBillToContactEmail(payment: PaymentItem): string {
        return payment.jpixOrderBillToContact.jpixContact.emailAddress;
    }

    getBillToContactAddresLine1(payment: PaymentItem): string {
        return payment.jpixOrderBillToContact.jpixAddress.addressLine1;
    }

    getBillToContactAddresLine2(payment: PaymentItem): string {
        return payment.jpixOrderBillToContact.jpixAddress.addressLine2;
    }

    getBillToContactCity(payment: PaymentItem): string {
        return `${payment.jpixOrderBillToContact.jpixAddress.city},
         ${payment.jpixOrderBillToContact.jpixAddress.stateOrProvinceCode} 
         ${payment.jpixOrderBillToContact.jpixAddress.postalCode}`;
    }

    getOrderShipments(): ShipmentItem[] {
        return this.orderInfo.jpixShipments;
    }

    getShipToContactName(shipment: ShipmentItem): string {
        return `${shipment.jpixOrderShipToContact.jpixContact.firstName} ${shipment.jpixOrderShipToContact.jpixContact.lastName}`;
    }

    getShipToContactPhone(shipment: ShipmentItem): string {
        return shipment.jpixOrderShipToContact.jpixContact.phoneNumber;
    }

    getShipToContactEmail(shipment: ShipmentItem): string {
        return shipment.jpixOrderShipToContact.jpixContact.emailAddress;
    }

    getShipToContactAddresLine1(shipment: ShipmentItem): string {
        return shipment.jpixOrderShipToContact.jpixAddress.addressLine1;
    }

    getShipToContactAddresLine2(shipment: ShipmentItem): string {
        return shipment.jpixOrderShipToContact.jpixAddress.addressLine2;
    }

    getShipToContactCity(shipment: ShipmentItem): string {
        return `${shipment.jpixOrderShipToContact.jpixAddress.city},
         ${shipment.jpixOrderShipToContact.jpixAddress.stateOrProvinceCode} 
         ${shipment.jpixOrderShipToContact.jpixAddress.postalCode}`;
    }

    getItemsCount(): number {
        return this.orderInfo && this.orderInfo.photos.length || 0;
    }

    getOrderComments(order: any): any {
        return order.comments;
    }

    getOrderPaymentsData(order: any): any {
        let payments: any[] = [];
        order.payments.forEach((item: any) => {
            if (item.paymentDate) {
                let address = item.jpixOrderBillToContact.jpixAddress;
                let payment = {
                    lastName: item.jpixOrderBillToContact.jpixContact.lastName,
                    firstName: item.jpixOrderBillToContact.jpixContact.firstName,
                    paymentType: item.paymentDetails ? item.paymentDetails.paymentType : '', //these 3 conditions are for locally work only
                    amount: item.paymentDetails ? item.paymentDetails.amount : '',
                    creditCardNumber: item.paymentDetails ? this.getCreditCardInfo(item) : '',
                    billingAddress: `${address.addressLine1} ${address.addressLine2} <br>${address.city}, ${address.stateOrProvinceCode} ${address.postalCode}`,
                    createdBy: item.createdBy
                };
                payments.push(payment);
            }

        });

        return payments;
    }

    getCreditCardInfo(payment: PaymentItem): string {
        if (!payment.paymentDetails || !payment.paymentDetails.creditCard) {
            return '';
        }

        const creditCard = payment.paymentDetails.creditCard;// {cardType:"VISA",truncatedCardNumber: 1234};

        return `${creditCard.cardType} ${creditCard.truncatedCardNumber}`;
    }

    getPaymentType(payment: PaymentItem): string {
        if (!payment.paymentDetails || !payment.paymentDetails.paymentType) {
            return '';
        }

        return payment.paymentDetails.paymentType;
    }

    isOrderHasPrepurchasePhotos(order: OrderItem) {
        const photos = order && order.photos;

        return photos && photos.length > 0 && photos.some(photo => (photo.prepurchase && this.photoTypesService.isIndividual(photo.type)));
    }

    isOrderHasPrepurchaseCompositePhotos(order: OrderItem) {
        const photos = order && order.photos;

        return photos && photos.length > 0 && photos
            .some(photo => photo.prepurchase && this.photoTypesService.isComposite(photo.type));
    }

    isOrderHasPrepurchasePhotosWithBackgound(order: OrderItem) {
        const photos = order && order.photos;

        return photos && photos.length > 0 && photos
            .some(photo => !!(photo.prepurchase && photo.document.backgroundKey));
    }

    isOrderHasPrepurchaseIndividualPhotosMsg(order: OrderItem) {
        const photos = order && order.photos;

        return photos && photos.length > 0 && photos
            .some(photo => photo.prepurchase && this.photoTypesService.isIndividual(photo.type));
    }

    isOrderHasIndividualPhotos(order: OrderItem) {
        const photos = order && order.photos;

        return photos && photos.length > 0 && photos
            .some(photo => this.photoTypesService.isIndividual(photo.type));
    }

    isIssueRefund(): boolean {
        return this.orderInfo.refund ? true : false;
    }

    getProcessedData(data: OrderItem[]): any {

        return this.setStatusDescription(data, ORDER_STATUS).flatMap(
            (data: OrderItem[]) => this.setStatusDescription(data, FULFILLMENT_STATUS));
    }

    getOrderStatusName(order: OrderItem): Observable<any> {
        return this.orderStatusService.getOrderStatuses().map((res: any[]) => {
            let statusName = null;
            res.forEach((item: any) => {
                if (item.code === order.orderStatus) {
                    statusName = item.name;
                }
            });
            return statusName;
        });
    }

    getStatusesInfo(statusType: string): any {
        if (statusType === ORDER_STATUS) {
            return this.orderStatusService.getOrderStatuses().map((res: any) => {
                return res;
            });
        }
        else if (statusType === FULFILLMENT_STATUS) {
            return this.orderStatusService.getFulfillmentStatuses().map((res: any[]) => {
                return res;
            });
        }
    }

    setStatusDescription(data: OrderItem[], statusType: string): Observable<any> {
        return this.getStatusesInfo(statusType).map((res: any) => {
            data.forEach((dataItem: any) => {
                res.forEach((item: any) => {
                    if (dataItem[statusType] === item.code) {
                        if (item.description) {
                            dataItem[statusType] = `<span class="jpix-help jpix-help--no-icon" title='${item.description}'>${item.name}</span>`;
                        }
                        else {
                            dataItem[statusType] = `<span >${item.name}</span>`;
                        }
                    }
                });
            });
            return data;
        });
    }
}