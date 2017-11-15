import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Icon } from 'app/shared/models';
import { ApiService } from 'app/core/services';

@Injectable()
export class IconsService {
    private srcPrefix = GLOBAL_ENV && GLOBAL_ENV.API_URL || '/jpix-ecommerce-core/api/';

    constructor(private apiService: ApiService) { }

    get(): Observable<Icon[]> {
        return this.apiService.get('icon')
            .map(res => res && res.jpixImages || []);
    }

    getByKey(key: string): Observable<Icon> {
        return this.apiService.get(`icon/${key}`)
            .map(res => res && res.jpixImage || null);
    }

}
