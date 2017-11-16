import { Component, Input, OnInit } from '@angular/core';

import { PhotoCard } from 'app/shared/models';
import { photoTypes } from 'app/shared/constants';
import { PhotoTypesService } from 'app/core/services';

@Component({
    selector: 'evo-preview-list',
    templateUrl: './preview-list.component.html',
    styleUrls: ['./preview-list.component.scss']
})
export class PreviewListComponent implements OnInit {
    @Input() items: PhotoCard[];
    @Input() selectedId: string | null;
    compositePhotoType = photoTypes.COMPOSITE;
    sortedItems: any = {
        exludingComposite: [],
        [photoTypes.COMPOSITE]: [],
    };

    constructor(private photoTypesService: PhotoTypesService) { }

    ngOnInit() {
        this.sortItems();
    }

    sortItems() {
        this.items.forEach(item => {
            if (this.photoTypesService.isComposite(item)) {
                this.sortedItems[photoTypes.COMPOSITE].push(item);
                return;
            }

            this.sortedItems.exludingComposite.push(item)
        });
    }

    trackItem(index: any, item: PhotoCard) {
        return item ? item.id : undefined;
    }

}