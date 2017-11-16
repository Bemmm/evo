import { Photo } from 'app/shared/models';

export class OrderMessage {
    messageType: string;
    orderMessageID: string;
    message: string;
}

export class PaymentReference {
    paymentReferenceID: string;
    paymentReferenceType: string;
}

export class OrderItem {
    orderNumber: string;
    orderItemNumber: number;
    createdByDateTime: string;
    quantity: number;
    taxCategory: string;
    catalogId: string;
    orderStatus: string;
    customer: {
        custNumber: number;
        type: string;
        name: string;
    };
    evoItemCode: string;
    evoItemName: string;
    evoPrice: {
        key: string;
        type: string;
    };
    photoRef: {
        chilliDocumentId: string;
    };
    document: {
        id: string;
        thumbnail: string;
    };
    evoItemTotalAmount: {
        unitPrice: number;
        usaTax: {
            total: number;
            federal: number;
            state: number;
            county: number;
            city: number;
            district: number;
        },
        shippingTaxAmount: number;
        handlingTaxAmount: number;
        shippingAmount: number;
        baseShippingAmount: number;
        baseShippingTaxAmount: number;
        handlingAmount: number;
        itemDiscountAmount: number;
        shipDiscountAmount: number;
        subTotal: number;
        packageAmount: number;
    };
    orderMessages: OrderMessage[];
    shipmentReference: {
        shipmentNumber: string;
    };
    paymentRefs: PaymentReference[];
    paymentsBillToContact: any;
    payments: PaymentItem[];
    evoShipments: ShipmentItem[];
    photos: Photo[];
    comments: Comment[];
    fulfillmentStatus?: string;
    refund?: {
        amount: number;
    }
}

export class Comment {
    comment: string;
    createDate: number;
    creator: string;
}

export interface PaymentItem {
    evoOrderBillToContact: {
        evoAddress: AddressItem,
        evoContact: ContactItem
    }
    paymentDate?: string,
    paymentDetails?: {
        creditCard: {
            truncatedCardNumber: string | number,
            cardType: string
        },
        paymentType: string;
    },
    paymentSessionToken?: string;
}

export interface AddressItem {
    addressLine1: string,
    addressLine2: string,
    city: string,
    countryCode: string,
    postalCode: string,
    stateOrProvinceCode: string
}

export interface ContactItem {
    emailAddress: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    salutation: string
}

export interface ShipmentItem {
    evoOrderShipToContact: {
        evoAddress: AddressItem,
        evoContact: ContactItem
    },
    evoShipmentMethod: ShipmentMethod
}

export interface ShipmentMethod {
    id: string,
    key: string,
    type: string,
    name: string,
    carrier: string,
    cost: string,
    methodOfShipment: string
}

export interface OrderInformation {
    order: OrderItem,
    surveyLink: string
}
