import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SessionStorageService } from 'app/core/services';
import { SelectedPhotosActions } from 'app/shared/store/selected-photos';
import { PhotoCard, AppState } from 'app/shared/models';

@Injectable()
export class SelectedPhotosService {
    private storageKey = 'jpix-s-a-p';

    constructor(
        private store: Store<AppState>,
        private storageService: SessionStorageService,
        private selectedPhotosActions: SelectedPhotosActions
    ) { }

    load(): PhotoCard[] {
        const photos = this.storageService.getItem(this.storageKey, true) || [];

        this.selectedPhotosActions.load(photos);

        return photos;
    }

    get(): Observable<PhotoCard[]> {
        return this.store.select(appState => appState.selectedPhotos);
    }

    add(photo: PhotoCard) {
        const photos = [photo];

        this.save(photos);
        this.selectedPhotosActions.add(photo);
    }

    remove(photo: PhotoCard) {
        const photos: PhotoCard[] = [];

        this.save(photos);
        this.selectedPhotosActions.remove(photo);
    }

    save(photos: PhotoCard[]) {
        this.storageService.setItem(this.storageKey, photos, true);
    }

    clear() {
        this.storageService.setItem(this.storageKey, [], true);
        this.selectedPhotosActions.clear();
    }

}