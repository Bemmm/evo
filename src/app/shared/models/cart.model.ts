export interface CartOrderItemModel {
    quantity: string | number,
    jpixItemCode: string,
    jpixPrice: {
        key: string,
        type: string,
        value: string
    },
    photoRef?: {
        guid?: string,
        photoSessionKey?: string
    }
}

export interface CartItemModel {
    photos: [{
        guid?: string,
        photoSessionKey?: string,
        id?: string,
        type?: string,
        photoKey?: string,
        document?: {
            backgroundKey?: string
        }
    }],
    jpixOrderItems: CartOrderItemModel[]
}

export interface CartFormConfig {
    mode?: string,
    idKeyName?: string,
    isEditMode: boolean,
    hasApprove: boolean,
    hasHardcopyFee: boolean,
    hasRetouch: boolean,
}

export interface CartPersonalizationInfo {
    backgroundKey: string
}
