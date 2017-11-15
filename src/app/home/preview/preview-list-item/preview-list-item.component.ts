import { Component, Input, ViewEncapsulation, OnChanges, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { SelectedPhotosService, PoseService, UserService, PhotoSizesService } from 'app/core/services';
import { PhotoCard } from 'app/shared/models';

@Component({
    selector: 'jpix-preview-list-item',
    templateUrl: './preview-list-item.component.html',
    styleUrls: ['./preview-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PreviewListItemComponent implements OnChanges, OnDestroy {
    @Input() item: PhotoCard;
    @Input() selectedId: string | null;
    @Input() isComposite: boolean;
    loading: boolean = true;
    isYearbookPhoto: boolean = false;
    isConsumerCareUser: boolean = false;
    subscriptions: Subscription[] = [];

    constructor(
        private selectedPhotosService: SelectedPhotosService,
        private poseService: PoseService,
        private userService: UserService,
        private photoSizesService: PhotoSizesService
    ) {
        const subscription = this.userService.get().map(user => user.isConsumerCare())
            .subscribe(isConsumerCare => {
                this.isConsumerCareUser = isConsumerCare;
            });
        this.subscriptions.push(subscription);
    }

    ngOnChanges(changes: any) {
        if (changes['item'] && changes['item'].currentValue) {
            this.isYearbookPhoto = this.poseService.isYearbook(changes['item'].currentValue) && this.isConsumerCareUser;
        }
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    isSelected(item: PhotoCard) {
        return this.selectedId === item.id;
    }

    onSelect($event: any, item: PhotoCard) {
        if (this.loading || $event.target.className === 'jpix-photo-zoom__target') {
            return;
        }

        if (this.isSelected(item)) {
            this.selectedPhotosService.remove(item);
            return;
        }

        this.selectedPhotosService.add(item);
    }

    setLoading(state: boolean) {
        this.loading = state;
    }

    getImageLinkForZoom(link: string): string {
        return this.photoSizesService.getMediumSizeSrcLink(link);
    }
}