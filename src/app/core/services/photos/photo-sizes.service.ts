import { Injectable } from '@angular/core';

@Injectable()
export class PhotoSizesService {

    getMediumSizeSrcLink(link: string): string {
        return `${link}?size=medium`;
    }

}