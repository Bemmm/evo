import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import {
    CartService,
    PersonalizationModesService,
    CurrencyService
} from 'app/core/services';
import { CartFormConfig, PhotoCard } from 'app/shared/models';

@Injectable()
export class CartFormService {
    cartForm: FormGroup;
    subscriptions: Subscription[] = [];
    subTotal: number;
    mode: string;
    defaultConfig: CartFormConfig = {
        isEditMode: false,
        hasApprove: false,
        idKeyName: 'guid',
        hasHardcopyFee: false,
        hasRetouch: false
    };
    config: CartFormConfig;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cartService: CartService,
        private currencyService: CurrencyService
    ) { }

    getFormGroup() {
        return this.cartForm;
    }

    getSubTotal() {
        return this.currencyService.transform(this.subTotal);
    }

    initForms(config: CartFormConfig) {
        this.setConfig(config);
        this.buildForms();
        this.subscribeToForm()
    }

    setConfig(config: CartFormConfig) {
        this.config = Object.assign({}, this.defaultConfig, config);
        this.mode = this.config.mode;
    }

    buildForms() {
        const cartFormGroup = {
            items: this.fb.group(this.initItemsModel())
        };

        if (this.config.hasApprove) {
            Object.assign(cartFormGroup, {
                approve: this.fb.group({
                    value: [false],
                })
            })
        }

        if (this.config.hasHardcopyFee) {
            Object.assign(cartFormGroup, {
                hardcopyFee: this.fb.group({
                    value: this.initHardcopyFeeModel()
                })
            })
        }

        if (this.config.hasRetouch) {
            Object.assign(cartFormGroup, {
                retouch: this.initRetouchModel()
            })
        }

        this.cartForm = this.fb.group(cartFormGroup);
    }

    subscribeToForm() {
        const valueChanges = this.cartForm.valueChanges
            .startWith(true)
            .debounceTime(100);

        const firstSubscription = valueChanges.first()
            .subscribe(() => {
                this.initRetouchControl();
                this.initCountSubtotal();
            });

        const subscription = valueChanges.skip(1)
            .subscribe((formValue: any) => {
                this.toggleRetouch(formValue); // Can mutate formValue
                this.checkApprove();
                this.subTotal = this.cartService.countSubtotal(formValue);
            });

        this.subscriptions.push(subscription, firstSubscription);
    }

    initRetouchControl() {
        if (!this.config.hasRetouch) {
            return;
        }

        const control = this.cartForm.get('retouch').get('selected');

        if (!this.config.isEditMode) {
            control.disable();
            return;
        }

        control.setValue(this.cartService.getOrderItemRetouch());
        control.enable();
    }

    initCountSubtotal() {
        if (!this.config.isEditMode) {
            this.subTotal = 0;
            return;
        }

        this.subTotal = this.cartService.countSubtotalFromOrderItem();
    }

    toggleRetouch(value: any) {
        if (!this.config.hasRetouch) {
            return;
        }

        const retouchControl = this.cartForm.get('retouch').get('selected');
        const retouchInfoControl = this.cartForm.get('retouch').get('info');

        if (value === 'disable') {
            retouchControl.disable();
            retouchInfoControl.disable();
            this.unsubscribe();
            return;
        }

        const isRetouchCanBeSelected = this.cartService.checkRetouch(value);

        if (!isRetouchCanBeSelected) {
            retouchControl.reset(null);
            retouchControl.disable();
            value.retouch = null;
            return;
        }

        const retouchValue = retouchControl.value || this.cartService.defaultRetouchValue;
        retouchControl.setValue(retouchValue);
        retouchControl.enable();
        retouchInfoControl.enable();
    }

    initItemsModel(): any {
        const featuresFormModel = {};

        this.cartService.getFeaturesKeys().forEach((key: string) => {
            featuresFormModel[key] = this.initFeature(key);
        })

        return featuresFormModel;
    }

    initFeature(key: string): FormGroup {
        const selectedQuantity = this.config.isEditMode ?
            this.cartService.getOrderItemFeatureQuantity(key) : '';

        return this.fb.group({
            quantity: [selectedQuantity]
        })
    }

    initRetouchModel(): FormGroup {
        const selectedRetouchInfo = this.cartService.getRetouchInfo();
        const retouchInfo = this.config.isEditMode && selectedRetouchInfo ? selectedRetouchInfo : this.cartService.getRetouch()['featureOptions'][1].description;
        return this.fb.group({
            selected: null,
            info: retouchInfo
        })
    }

    initHardcopyFeeModel() {
        const value = this.config.isEditMode ? this.cartService.getOrderItemInfo().hardcopyFee : false;
        return value;
    }

    addToCart(id: string, selectedPhoto: PhotoCard) {
        const requestId = {
            key: this.config.idKeyName,
            value: id
        }

        return this.cartService.addToCart(this.cartForm.value, requestId, this.mode, selectedPhoto);
    }

    updateCart(orderItemId: string, photoType: string) {
        return this.cartService.updateCart(this.cartForm.value, orderItemId, this.mode, photoType);
    }

    isApproved(): boolean {
        return this.config.hasApprove ? this.cartForm.value.approve.value : true;
    }

    isDirty() {
        return this.cartService.atLeastOnFeaturesSelected(this.cartForm.value);
    }

    isValid(): boolean {
        return this.isApproved() && this.isDirty();
    }

    destroy() {
        if (this.cartForm) {
            this.cartForm = null;
        }

        this.subTotal = 0;
        this.unsubscribe();
    }

    unsubscribe() {
        this.subscriptions
            .forEach((subscription: Subscription) => subscription.unsubscribe());
    }

    getSelectedItemsKeys(): string[] {
        if (!this.cartForm) {
            return [];
        }

        const items = this.cartForm.value.items;

        if (!items) {
            return [];
        }

        return Object.keys(items).filter((key: string) => items[key].quantity > 0);
    }

    checkApprove() {
        const selectedItemsKeys = this.getSelectedItemsKeys();
        const approveCtrl = this.cartForm.get('approve');

        if (!selectedItemsKeys.length && approveCtrl && approveCtrl.value.value) {
            approveCtrl.setValue({ value: false });
        }
    }
}