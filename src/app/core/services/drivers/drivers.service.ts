import {
  Injectable
} from '@angular/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  ApiService,
} from '..';

@Injectable()
export class DriversService {
  private getUsersUrl: string = 'company/users';
  private addDriverUrl: string = 'company/user';
  private editDriverUrl: string = 'company/user';
  private deleteDriverUrl:string = 'company/users';
  constructor(
    private api: ApiService
  ) { }

  addDriver(model: any, token?: string): Observable<any> {
    return this.api.post(`${this.addDriverUrl}`, model, token);
  }
  editDriver(model: any, token?: string): Observable<any> {
    return this.api.put(`${this.editDriverUrl}/${model._id}`, model, token);
  }
  getDrivers(companyId: any, token?: string): Observable<any> {
    return this.api.get(`${this.getUsersUrl}/${companyId}`, null, token);
  }
  deleteDriver(driverId: any, token?: string) {
    return this.api.delete(`${this.deleteDriverUrl}/${driverId}`, null, token);

  }

}
