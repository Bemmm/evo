import { Injectable } from '@angular/core';

import { PhotoCard, PhotoDetails } from 'app/shared/models';
import { photoTypes } from 'app/shared/constants';

@Injectable()
export class PhotoTypesService {
    isIndividual(photo: PhotoCard | PhotoDetails | string): boolean {
        if (typeof photo === 'string') {
            return photo === photoTypes.INDIVIDUAL;
        }

        return photo.type === photoTypes.INDIVIDUAL;
    }

    isComposite(photo: PhotoCard | PhotoDetails | string): boolean {
        if (typeof photo === 'string') {
            return photo === photoTypes.COMPOSITE;
        }

        return photo.type === photoTypes.COMPOSITE;
    }
}