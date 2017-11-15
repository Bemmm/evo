import { Injectable } from '@angular/core';

import { PhotoCard } from 'app/shared/models';
import { photoPose } from 'app/shared/constants';

@Injectable()
export class PoseService {
    isYearbook(photo: PhotoCard): boolean {
        return photo.pose === photoPose.YEARBOOK;
    }
}