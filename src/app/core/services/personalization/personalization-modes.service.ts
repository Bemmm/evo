import { Injectable } from '@angular/core';

@Injectable()
export class PersonalizationModesService {
    static PREFIX = 'personalization';
    static EDIT = `${PersonalizationModesService.PREFIX}/edit`;
    static PRINTS = `${PersonalizationModesService.PREFIX}/prints`;
    static ADD = `${PersonalizationModesService.PREFIX}/add`;

    isEditMode(mode: string): boolean {
        return mode === PersonalizationModesService.EDIT;
    }

    isPrintsMode(mode: string): boolean {
        return mode === PersonalizationModesService.PRINTS;
    }

    isAddMode(mode: string): boolean {
        return mode === PersonalizationModesService.ADD;
    }
};