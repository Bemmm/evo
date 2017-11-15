import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ApiService } from 'app/core/services';

@Injectable()
export class SchoolService {
    private apiServiceUrl: string = '';

    constructor(private api: ApiService) { }

    findSchoolByName (term: string): Observable<any> {
        return this.api.get(this.apiServiceUrl + 'searchSchool', {query: term});
    }
}