import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from 'app/core/services';

@Injectable()
export class FeaturesService {
    featuresKeys = {
        VALUE_PACK: 'ValuePack',
        FAMILY_PACK: 'FamilyPack'
    };

    constructor(private apiService: ApiService) { }

    isValuePack(featureKey: string): boolean {
        return featureKey === this.featuresKeys.VALUE_PACK;
    }

    isFamilyPack(featureKey: string): boolean {
        return featureKey === this.featuresKeys.FAMILY_PACK;
    }

    isPack(featureKey: string): boolean {
        return this.isValuePack(featureKey) || this.isFamilyPack(featureKey);
    }

    getPackLabel(originalLabel: string): string {
        const regexp = /Pack$/;

        return originalLabel.replace(regexp, ' Pack');
    }

    getPackDescription(featureKey: string, originalDescription: string): string {
        if (this.isValuePack(featureKey) || this.isFamilyPack(featureKey)) {
            let pos = originalDescription.indexOf("(");
            return originalDescription.substring(pos);
        }

        return '';
    }

    getValuePackDescription(originalDescription: string): string {
        const regexp = /^Value Pack\s+/; // now is not used because bug in xml

        return originalDescription.replace(regexp, '');
    }

    getFamilyPackDescription(originalDescription: string): string {
        const regexp = /^Family Pack\s+/;

        return originalDescription.replace(regexp, '');
    }

    getPackSizesByKey(key: string): Observable<any> {
        return this.apiService.get(`getPackSizesByKey/${key}`);
    }
}