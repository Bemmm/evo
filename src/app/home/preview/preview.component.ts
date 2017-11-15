import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { PhotosForAccountService, VenuesService, SelectedPhotosService } from 'app/core/services';
import { PhotoCard } from 'app/shared/models';
import { SelectOption } from 'app/shared/components/select/select.model';

import { Subscription } from 'rxjs/Subscription';

import { FilterValue } from './preview-filters/preview-filters.component';

@Component({
    selector: 'jpix-preview',
    templateUrl: './preview.component.html',
    styleUrls: ['./preview.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PreviewComponent implements OnInit, OnDestroy {
    photos: PhotoCard[] = [];
    filteredPhotos: PhotoCard[] = [];
    selectedPhoto: PhotoCard | null = null;
    selectedPhotoCardId: string | null = null;
    eventNamesMap: any;
    groupedByEventsPhotos: any[];
    loading: boolean;
    venues: any[] = [];
    subscriptions: Subscription[] = [];
    freeDigitalDownloadOrderThreshold: number = 0;
    isGuestMode: boolean;
    eventOptions: SelectOption[] = [];
    studentOptions: SelectOption[] = [];
    filterKeys = {
        STUDENT_KEY: 'studentKey',
        EVENT_KEY: 'eventCode'
    };
    selectedFiltersValues = {
        [this.filterKeys.STUDENT_KEY]: '',
        [this.filterKeys.EVENT_KEY]: ''
    };
    photosForAccountParams: {
        eventCode: string,
        subjectId: string
    };
    showBlankMessage: boolean = false;
    effectiveStartDate: any;
    mobileShowEvents: boolean = false;
    isVenuesEmpty: boolean = true;

    constructor(
        private photosForAccountService: PhotosForAccountService,
        private router: Router,
        private selectedPhotosService: SelectedPhotosService,
        private venuesService: VenuesService,
        private activatedRoute: ActivatedRoute
    ) {
        this.getRouteData();
        this.getSelectedPhotosFromState();
    }

    ngOnInit () {
        let el = document.querySelector('.jpix-home-mobile-content');
        el.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onScroll);
    }

    ngOnDestroy() {
        let el = document.querySelector('.jpix-home-mobile-content');
        el.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onScroll);
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    onScroll () {
        let buttonsEl: any = document.querySelector('.jpix-panel-mobile-actions');
        if (!buttonsEl.offsetParent) return;
        let containerEl: any = document.querySelector('.jpix-home-mobile-content');
        if (containerEl.scrollTop + containerEl.clientHeight + containerEl.offsetTop < buttonsEl.offsetTop + buttonsEl.clientHeight) containerEl.classList.add('jpix-fixed-elements')    
            else containerEl.classList.remove('jpix-fixed-elements')   
    }

    setLoading(state: boolean) {
        this.loading = state;
        if (!state) {
            setTimeout(this.onScroll, 50);
        }
    }

    getRouteData() {
        const routerSubscription = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute.snapshot.data['isGuestMode'])
            .flatMap(isGuestMode => {
                this.isGuestMode = isGuestMode;
                return this.activatedRoute.params;
            })
            .subscribe(params => {
                const { eventCode, subjectId } = params;
                this.photosForAccountParams = { eventCode, subjectId };
                this.setSelectedFiltersValues();
                this.loadPhotosForAccount();
            });

        this.subscriptions.push(routerSubscription);
    }

    setSelectedFiltersValues() {
        const { eventCode, subjectId } = this.photosForAccountParams;

        if (!eventCode || !subjectId) {
            return;
        }

        this.selectedFiltersValues = {
            [this.filterKeys.STUDENT_KEY]: subjectId,
            [this.filterKeys.EVENT_KEY]: eventCode
        }
    }

    loadPhotosForAccount() {
        let photosForAccount$;

        if (this.isGuestMode) {
            const { subjectId, eventCode } = this.photosForAccountParams

            photosForAccount$ = this.photosForAccountService.getConsumerCarePhotosForSubject(subjectId, eventCode);
        } else {
            photosForAccount$ = this.photosForAccountService.getPhotos();
        }

        this.setLoading(true);

        const subscription = photosForAccount$.subscribe(
            result => {
                this.mapPhotosForAccount(result);
                this.getEffectiveStartDate(result);
                this.freeDigitalDownloadOrderThreshold = result.freeDigitalDownloadOrderThreshold;
            },
            err => {
                console.error(err);
            },
            () => {

                this.setLoading(false);
            });
        this.subscriptions.push(subscription);
    }

    mapPhotosForAccount(result: any) {
        if (!result || result.list.length === 0) {
            this.showBlankMessage = true;
            return;
        }

        this.showBlankMessage = false;

        const mapToSelectedValues = (obj: any) => (
            Object.keys(obj).map(key => (
                { value: key, title: obj[key] }
            ))
        );
        const sortNames = (prevName: any, nextName: any) => prevName.title > nextName.title ? 1 : -1;

        this.photos = result.list;
        this.filteredPhotos = result.list;
        this.eventOptions = mapToSelectedValues(result.eventNames);
        this.eventNamesMap = result.eventNames;
        this.studentOptions = mapToSelectedValues(result.studentNames).sort(sortNames);
        this.venues = result.venues;
        this.isVenuesEmpty = !Object.keys(this.venues).filter(key => this.venues[key].venues.length).length;
        this.groupedByEventsPhotos = this.groupPhotosByEvents();
    }

    getEffectiveStartDate(data: any) {
        if (this.isGuestMode) {
            this.effectiveStartDate = data.eventEffectiveStartDates[0];
        }
    }

    getSelectedPhotosFromState() {
        const subscription = this.selectedPhotosService.get()
            .subscribe(result => {
                this.selectedPhoto = result.length ? result[0] : null;
                this.selectedPhotoCardId = this.selectedPhoto ? this.selectedPhoto.id : null;
            });
        this.subscriptions.push(subscription);
    }


    groupPhotosByEvents() {
        return Object.keys(this.eventNamesMap).map((code: string) => {
            const photos = this.filteredPhotos.filter(photo => photo.eventCode === code);

            return {
                title: this.eventNamesMap[code],
                code,
                photos
            };
        })
    }

    filterPhotos(filter: FilterValue) {
        if (!filter.selected && filter.selected !== '') {
            return;
        }

        this.selectedFiltersValues[filter.key] = filter.selected;

        this.toggleSelectedDependingOnFilter(filter)

        this.filteredPhotos = this.photos.filter(photo => (
            Object.keys(this.selectedFiltersValues).every(key => {
                if (!this.selectedFiltersValues[key]) {
                    return true;
                }

                return photo[key] === this.selectedFiltersValues[key];
            }
            )));
        this.groupedByEventsPhotos = this.groupPhotosByEvents();
    }

    toggleSelectedDependingOnFilter(filter: FilterValue) {
        if (!this.selectedPhoto || this.selectedPhoto[filter.key] === filter.selected || filter.selected === '') {
            return;
        }

        this.selectedPhotosService.remove(this.selectedPhoto)
    }

    isPrePurchasePhotoSelected() {
        return this.selectedPhoto && this.selectedPhoto.prepurchase;
    }

    isPersonalizeDisabled(): boolean {
        return !(this.selectedPhoto && !this.selectedPhoto.prepurchase) || this.isPrePurchasePhotoSelected() || this.loading;
    }

    isOrderPrintsDisabled(): boolean {
        return !this.selectedPhoto || this.loading;
    }

    isShowPersonalizeButton(): boolean {
        return !this.isGuestMode;
    }

    isShowOrderPrintsButton(): boolean {
        return true;
    }

    navigateToPersonalize() {
        this.router.navigate(['personalize']);
    }

    onOrderPrintsClick() {
        if (this.selectedPhoto.prepurchase) {
            this.router.navigate(['pre-purchase']);
            return;
        }

        if (this.isGuestMode) {
            this.router.navigate(['guest/purchase']);
            return;
        }

        this.router.navigate(['personalize/prints']);
    }

}