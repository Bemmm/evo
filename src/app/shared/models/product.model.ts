export class FeatureOption {
    value: string;
    defaultOption: boolean;
    priceKey?: string;
    productPrice?: {
        retailPrice: number;
        key: string;
    };
}

export class Feature {
    featureOptions: FeatureOption[];
    featureDependency?: {
        productFeatureKeys: string[];
        type: string;
    };
    key: string;
    maximumQuantity: number;
}

export class ProductConfiguration {
    features: Feature[];
    description: string;
    key: string;
    name: string;
    taxCategory: string;
    fulfillmentType: string;
    fulfillmentCenter: string;
}