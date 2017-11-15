export class BillingInfo {
    contact: ContactInfo
    address: AddressInfo

}
export class ContactInfo {
    firstName: string;
    lastName: string;
    salutation?: string;
    email?: string;
    phoneNumber: string
}

export class AddressInfo {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    stateOrProvinceCode: string;
    postalCode: string;
    countryCode: string;
}

export class BillingAndShippingModel {
    billingInformation: BillingInfo;
    shippingSameAsBilling: boolean;
    forceUpdate?: boolean;
    shippingInformation: BillingInfo;
    orderItemsCost: number;
    orderItemsAmount: number;
    shipmentMethods: any[]
}
