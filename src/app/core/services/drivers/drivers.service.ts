import {
  Injectable
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  ApiService,
} from 'app/core/services';

@Injectable()
export class DriversService {
  private getUsersUrl: string = 'company/users';
  private addDriverUrl: string = 'company/user';
  private editDriverUrl: string = 'company/user';

  constructor(
    private api: ApiService
  ) {}

  addDriver(model: any, token?:string): Observable < any > {
    return this.api.post(`${this.addDriverUrl}`, model, token);
  }
  editDriver(model: any, token?:string): Observable < any > {
    return this.api.put(`${this.editDriverUrl}/${model._id}`, model, token);
  }
  getDrivers(companyId: any, token?:string): Observable < any > {
    return this.api.get(`${this.getUsersUrl}/${companyId}`, null, token);
  }

}
