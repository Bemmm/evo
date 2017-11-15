import { Injectable } from '@angular/core';

@Injectable()
export class PrePurchaseModesService {
    static PREFIX = 'pre-purchase';
    static EDIT = `${PrePurchaseModesService.PREFIX}/edit`;
    static ADD = `${PrePurchaseModesService.PREFIX}/add`;

    isEditMode(mode: string): boolean {
        return mode === PrePurchaseModesService.EDIT;
    }

    isAddMode(mode: string): boolean {
        return mode === PrePurchaseModesService.ADD;
    }

};