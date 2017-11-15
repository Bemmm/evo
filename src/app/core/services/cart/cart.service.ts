import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiService, PhotoTypesService } from 'app/core/services';
import { PersonalizationService } from 'app/core/services'
import { PhotoCard, Photo, ProductConfiguration, CartItemModel, CartOrderItemModel } from 'app/shared/models';

@Injectable()
export class CartService {
    defaultRetouchValue = 'No retouching';
    featuresKeysConst = {
        RETOUCH: 'Retouch'
    };
    retouchDependency = {
        ONEOF: 'oneof'
    };
    productConfig: ProductConfiguration;
    productConfigMap = {
        retouch: {},
        features: {},
        hardcopyFee: {}
    };
    orderItem: {
        guid: string,
        retouch: string,
        retouchInfo: string,
        features: any,
        photoSessionKey: string,
        hardcopyFee: boolean,
        photoKey: string,
        photoType: string,
        personlizationInfo: {
            backgroundUrl: string;
            backgroundKey: string
        }
    };
    consumareCareProductConfig: ProductConfiguration;

    constructor(
        private api: ApiService,
        private personalizationService: PersonalizationService,
        private photoTypesService: PhotoTypesService
    ) { }

    setProductConfig(productConfig: ProductConfiguration) {
        this.productConfig = productConfig;
        this.mapProductFeatures();
    }

    setConsumareCareProductConfig(productConfig: ProductConfiguration) {
        this.consumareCareProductConfig = productConfig;
        this.mapHardcopyFeeConfig();
    }

    mapHardcopyFeeConfig() {
        this.productConfigMap.hardcopyFee = this.consumareCareProductConfig.features[0].featureOptions[0];
    }

    getHardcopyFeeConfig() {
        return this.productConfigMap.hardcopyFee;
    }

    getHardcopyFeeRetailPrice() {
        const hardcopyFee = this.productConfigMap.hardcopyFee;

        return hardcopyFee && hardcopyFee['productPrice'] && hardcopyFee['productPrice'].retailPrice || 0;
    }

    setOrderItem(orderItemData: any) {
        const retouch = orderItemData.jpixOrderItems.filter((orderItem: any) => orderItem.jpixItemCode === 'Retouch')[0];
        const hardcopyFee = orderItemData.jpixOrderItems.some((orderItem: any) => orderItem.jpixItemCode === 'HardCopyOrderHandling');

        this.orderItem = {
            photoSessionKey: orderItemData.photos[0].photoSessionKey,
            photoKey: orderItemData.photos[0].photoKey,
            guid: orderItemData.photos[0].guid,
            photoType: orderItemData.photos[0].type,
            retouch: retouch ? retouch.jpixItemName : this.defaultRetouchValue,
            retouchInfo: retouch ? retouch.jpixItemDescription : '',
            hardcopyFee,
            personlizationInfo: {
                backgroundKey: orderItemData.photos[0].document && orderItemData.photos[0].document.backgroundKey || null,
                backgroundUrl: orderItemData.photos[0].document && orderItemData.photos[0].document.background || null
            },

            features: orderItemData.jpixOrderItems
                .reduce((prev: any, next: any) => {
                    prev[next.jpixItemCode] = { quantity: next.quantity };

                    return prev;
                }, {})
        }
    }

    getOrderItemInfo(): any {
        return this.orderItem;
    }

    getOrderItemGuid(): string {
        return this.orderItem && this.orderItem.guid;
    }

    getOrderItemPhotoSessionKey(): string {
        return this.orderItem && this.orderItem.photoSessionKey;
    }

    getOrderItemPhotoKey(): string {
        return this.orderItem && this.orderItem.photoKey;
    }

    getOrderItemPhotoType(): string {
        return this.orderItem && this.orderItem.photoType;
    }

    getOrderItemRetouch(): string {
        return this.orderItem && this.orderItem.retouch;
    }

    getOrderItemFeatureQuantity(key: string): string {
        return this.orderItem && this.orderItem.features[key] && this.orderItem.features[key]['quantity'];
    }

    getOrderItemSelectedBackgroundKey(): string {
        return this.orderItem && this.orderItem.personlizationInfo.backgroundKey || null;
    }

    getOrderItemSelectedBackgroundUrl(): string {
        return this.orderItem && this.orderItem.personlizationInfo.backgroundUrl || null;
    }

    getRetouchInfo(): string {
        return this.orderItem && this.orderItem.retouchInfo;
    }

    mapProductFeatures() {
        this.productConfigMap.features = {};
        this.productConfigMap.retouch = {};

        this.productConfig.features
            .forEach((feature: any) => {
                if (feature.key !== this.featuresKeysConst.RETOUCH) {
                    this.productConfigMap.features[feature.key] = feature;
                    return;
                }
                this.productConfigMap.retouch = feature;
            });
    }


    generateId(guid: string) {
        return `${guid}-${Math.random().toString().replace(/^0\./, '')}`;
    }

    getSelectedRetouchPrice(retouch: any) {
        if (!(retouch && retouch.selected && retouch.selected !== this.defaultRetouchValue)) {
            return 0;
        }

        return this.getRetouchFeature()['featureOptions']
            .reduce((prev: any, next: any) => next.value === retouch.selected ? next.productPrice.retailPrice : prev, 0);
    }

    getRetouchFeature() {
        return this.productConfigMap.retouch;
    }

    checkRetouch(formData: any) {
        if (this.getRetouchFeature()['featureDependency'].type === this.retouchDependency.ONEOF) {
            return this.checkOneOfRetouch(formData);
        }

        return false;
    }

    checkOneOfRetouch(formData: any) {
        return this.productConfigMap.retouch['featureDependency'].productFeatureKeys
            .some((key: string) => formData['items'][key].quantity > 0);
    }

    atLeastOnFeaturesSelected(formData: any) {
        return Object.keys(formData['items']).some(key => formData['items'][key].quantity > 0);
    }

    getFeatureRetailPrice(featureKey: string) {
        if (!this.productConfigMap.features[featureKey]) {
            return 0;
        }

        return this.productConfigMap.features[featureKey].featureOptions[1].productPrice.retailPrice;
    }

    getRetouchPrice(retouchName: string) {
        if (!this.getRetouchFeature()['featureOptions']) {
            return 0;
        }
        const productPrice = this.getRetouchFeature()['featureOptions'].filter((retouch: any) => retouch.value == retouchName)[0].productPrice;
        const retouchPrice = {
            key: productPrice.key,
            value: productPrice.retailPrice
        };

        return retouchPrice;
    }

    getFeaturePriceType(featureKey: string) {
        if (!this.productConfigMap.features[featureKey]) {
            return null;
        }

        return this.productConfigMap.features[featureKey].featureOptions[1].productPrice.type;
    }

    getFeaturePriceKey(featureKey: string) {
        if (!this.productConfigMap.features[featureKey]) {
            return null;
        }
        return this.productConfigMap.features[featureKey].featureOptions[1].productPrice.key;
    }

    getFeaturePriceName(featureKey: string) {
        if (!this.productConfigMap.features[featureKey]) {
            return null;
        }

        return this.productConfigMap.features[featureKey].featureOptions[1].value;
    }

    getFeaturesKeys(): string[] {
        return Object.keys(this.productConfigMap.features);
    }

    getFeatures() {
        return this.productConfigMap.features;
    }

    getRetouch() {
        return this.productConfigMap.retouch;
    }

    checkIfHasRetouchItem(data: any) {
        return data.jpixOrderItems.filter((orderItem: any) => orderItem.jpixItemCode === "Retouch").length > 0;
    }

    countSubtotal(formValue: any) {
        const hardcopyFeePrice = formValue.hardcopyFee && formValue.hardcopyFee.value ? this.getHardcopyFeeRetailPrice() : 0;

        return Object.keys(formValue.items).reduce((prev, next) => (
            this.getFeatureRetailPrice(next) * formValue.items[next]['quantity'] + prev
        ), this.getSelectedRetouchPrice(formValue.retouch) + hardcopyFeePrice);
    }

    countSubtotalFromOrderItem() {
        const hardcopyFeePrice = this.orderItem.hardcopyFee && this.orderItem.hardcopyFee ? this.getHardcopyFeeRetailPrice() : 0;

        return Object.keys(this.orderItem.features).reduce((prev, next) => (
            this.getFeatureRetailPrice(next) * this.orderItem.features[next]['quantity'] + prev
        ), this.getSelectedRetouchPrice({ selected: this.orderItem.retouch }) + hardcopyFeePrice);
    }

    mapNewOrderItemData(
        formData: any,
        requestId: any,
        mode: string,
        selectedPhoto: PhotoCard
    ): any {
        const formOrderItems = formData.items;
        const jpixOrderItems: CartOrderItemModel[] = Object.keys(formOrderItems)
            .filter(key => formOrderItems[key].quantity > 0)
            .map(key => ({
                quantity: formOrderItems[key].quantity,
                jpixItemCode: key,
                jpixItemName: this.getFeaturePriceName(key),
                jpixPrice: {
                    key: this.getFeaturePriceKey(key),
                    type: this.getFeaturePriceType(key),
                    value: this.getFeatureRetailPrice(key)
                },
                photoRef: {
                    [requestId.key]: requestId.value,
                    type: selectedPhoto.type,
                    photoKey: selectedPhoto.photoKey,
                },
                fulfillmentType: this.productConfig.fulfillmentType
            }));

        if (formData.retouch && formData.retouch.selected !== this.defaultRetouchValue) {
            const retouchItem: any = {
                quantity: 1,
                jpixItemCode: this.featuresKeysConst.RETOUCH,
                jpixItemName: formData.retouch.selected,
                jpixPrice: this.getRetouchPrice(formData.retouch.selected),
                photoRef: {
                    [requestId.key]: requestId.value,
                    type: selectedPhoto.type,
                    photoKey: selectedPhoto.photoKey,
                },
                fulfillmentType: this.productConfig.fulfillmentType,
                jpixItemDescription: formData.retouch.info
            }
            jpixOrderItems.push(retouchItem);
        }

        if (formData.hardcopyFee && formData.hardcopyFee.value) {
            const hardcopyFeeOrderItem = this.getHardcopyFeeOrderItem(requestId, selectedPhoto);

            jpixOrderItems.push(hardcopyFeeOrderItem);
        }

        const cartItem: CartItemModel = {
            photos: [{
                [requestId.key]: requestId.value,
                type: selectedPhoto.type,
                photoKey: selectedPhoto.photoKey,
                document: this.photoTypesService.isIndividual(selectedPhoto.type) ?
                    this.personalizationService.getCheckedPersonalization() : {}
            }],
            jpixOrderItems
        };

        return cartItem;
    }

    mapOrderItemData(formData: any, mode: string, photoType: string): any {
        const formOrderItems = formData.items;
        const jpixOrderItems: any[] = Object.keys(formOrderItems)
            .filter(key => formOrderItems[key].quantity > 0)
            .map(key => ({
                quantity: formOrderItems[key].quantity,
                jpixItemCode: key,
                jpixItemName: this.getFeaturePriceName(key),
                jpixPrice: {
                    key: this.getFeaturePriceKey(key),
                    type: this.getFeaturePriceType(key),
                    value: this.getFeatureRetailPrice(key)
                }
            }));

        if (formData.retouch && formData.retouch.selected !== this.defaultRetouchValue) {
            const retouchItem: any = {
                quantity: 1,
                jpixItemCode: this.featuresKeysConst.RETOUCH,
                jpixItemName: formData.retouch.selected,
                jpixPrice: this.getRetouchPrice(formData.retouch.selected),
                jpixItemDescription: formData.retouch.info
            }
            jpixOrderItems.push(retouchItem);
        }

        if (formData.hardcopyFee && formData.hardcopyFee.value) {
            const hardcopyFeeOrderItem = this.getHardcopyFeeOrderItem();

            jpixOrderItems.push(hardcopyFeeOrderItem);
        }

        const photo = this.photoTypesService.isIndividual(photoType) ? {
            document: this.personalizationService.getCheckedPersonalization()
        } : {};

        const cartItem: CartItemModel = {
            photos: [photo],
            jpixOrderItems
        };

        return cartItem;
    }

    getHardcopyFeeOrderItem(requestId: any = null, selectedPhoto: PhotoCard = null) {
        const hardcopyFee = this.productConfigMap.hardcopyFee;

        if (!hardcopyFee) {
            return null;
        }

        const item = {
            quantity: 1,
            jpixItemCode: hardcopyFee['key'],
            jpixItemName: hardcopyFee['value'],
            jpixPrice: hardcopyFee['productPrice'],
            fulfillmentType: this.productConfig.fulfillmentType,
        };

        if (requestId && selectedPhoto) {
            Object.assign(item, {
                photoRef: {
                    [requestId.key]: requestId.value,
                    type: selectedPhoto.type,
                    photoKey: selectedPhoto.photoKey,
                }
            })
        }

        return item;
    }

    addToCart(
        formData: any,
        requestId: any,
        mode: string,
        selectedPhoto: PhotoCard
    ): Observable<any> {
        const itemData = this.mapNewOrderItemData(formData, requestId, mode, selectedPhoto);

        return this.api.post('orderItem', itemData);
    }

    getItemById(id: string) {
        return this.api.get(`orderItem/${id}`);
    }

    updateCart(
        formData: any,
        id: string,
        mode: string,
        photoType: string
    ) {
        const itemData = this.mapOrderItemData(formData, mode, photoType);

        return this.api.put(`orderItem/${id}`, itemData);
    }

    getOrderItemsCount() {
        return this.api.get(`orderItemsCount`);
    }

}