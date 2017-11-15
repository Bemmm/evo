import { Injectable } from '@angular/core';

import { LocalStorageService } from 'app/core/services';

interface ConsumerCarePreviewParams {
    eventCode: string,
    subjectId: string,
}

@Injectable()
export class PreviewParamsService {
    private storageKey = 'jpix-consumer-care-preview-params';

    constructor(
        private localStorageService: LocalStorageService
    ) { }

    get(): ConsumerCarePreviewParams {
        return this.localStorageService.getItem(this.storageKey);
    }

    set(params: ConsumerCarePreviewParams) {
        this.localStorageService.setItem(this.storageKey, params);
    }

    clear() {
        this.localStorageService.removeItem(this.storageKey);
    }

}