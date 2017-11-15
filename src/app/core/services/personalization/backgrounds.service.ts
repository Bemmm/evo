import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Background } from 'app/shared/models';
import { ApiService } from 'app/core/services';

@Injectable()
export class BackgroundsService {
    backgroundTypes = {
        SIMPLE: 'background',
        YEARBOOK: 'yearbook'
    };
    backgroundSizes = {
        THUMB: 'thumb',
        MEDIUM: 'medium'
    };
    private srcPrefix = GLOBAL_ENV && GLOBAL_ENV.API_URL || '/jpix-ecommerce-core/api/';

    constructor(private apiService: ApiService) { }

    isYearbook(bg: Background): boolean {
        return bg.type === this.backgroundTypes.YEARBOOK;
    }

    get(): Observable<Background[]> {
        return this.apiService.get('imageBackground')
            .map(res => res && res.jpixImages || []);
    }

    getByKey(key: string): Observable<Background> {
        return this.apiService.get(`imageBackground/${key}`)
            .map(res => res && res.jpixImage || null);
    }

    getSrcLinkByKey(key: string, size: string = this.backgroundSizes.MEDIUM): string {
        return `${this.srcPrefix}imageBackgroundKey/${key}?size=${size}`;
    }

    getThumbnailSrcLinkByKey(key: string): string {
        return `${this.srcPrefix}imageBackgroundKey/${key}?size=${this.backgroundSizes.THUMB}`;
    }

    getPhotoSrcWithCustomBackground(guid: string, key: string, size: string = this.backgroundSizes.MEDIUM): string {
        return `${this.srcPrefix}imageBackgroundChange/${guid}/${size}/${key}`;
    }
}
