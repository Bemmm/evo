import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { ApiService } from 'app/core/services';

@Injectable()
export class StudentService {
    private apiServiceUrl: string = '';

    constructor(private api: ApiService) { }

    searchStudent (data: any): Observable<any> {
        return this.api.post(this.apiServiceUrl + 'searchStudent', data);
    }
}