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
export class CarsService {
  private addTruckUrl: string = 'car';
  private addCompanyTruckUrl: string = 'company/car';
  private editTruckUrl: string = 'cars';
  private deleteTruckUrl: string = 'car';
  private deleteCompanyTruckUrl: string = 'company/cars';
  private getTrucksUrl: string = 'cars';
  private getCompanyTrucksUrl: string = 'company/cars';
  private categories: string = 'categories';
  private marks: string = 'marks';
  private models: string = 'models';
  private searchNearestCars: string = 'search-nearest-cars';
  private searchCars: string = 'search-cars';
  private uploadPhotoUrl: string = 'file';
  constructor(
    private api: ApiService
  ) { }

  getCategories() {
    return this.api.get(`${this.categories}`);
  }
  getMarks(categoryId: any) {
    return this.api.get(`${this.marks}/${categoryId}`);
  }
  getModels(categoryId: any, markId: any) {
    return this.api.get(`${this.models}/${categoryId}/${markId}`);
  }
  addTruck(model: any, token?: string, role?: string): Observable<any> {
    return this.api.post(`${role == 'company' ? this.addCompanyTruckUrl : this.addTruckUrl}`, model, token);
  }
  editTruck(model: any, token?: string, role?: string): Observable<any> {
    return this.api.put(`${role == 'company' ? this.editTruckUrl : this.editTruckUrl}/${model._id}`, model, token);
  }
  getTrucks(userId: any, token?: string, role?: string): Observable<any> {
    return this.api.get(`${role == 'company' ? this.getCompanyTrucksUrl : this.getTrucksUrl}/${userId}`, null, token);
  }
  deleteTruck(truckId: any, token?: string, role?: string) {
    return this.api.delete(`${role == 'company' ? this.deleteCompanyTruckUrl : this.deleteTruckUrl}/${truckId}`, null, token);
  }
  getNearCars(data:any) {
    return this.api.get(`${this.searchNearestCars}`, {
      coordinates:[data.where.longitude, data.where.latitude],
      price:[data.price[0], data.price[1]],
      sort:data.sort,
      weight_limit:data.weight_limit
    });
    }
  getTruckInfo(truckId: any){
    return this.api.get(`${this.searchCars}/${truckId}`);
  }
  uploadPhoto(data:any){
    return this.api.post(this.uploadPhotoUrl, data);
  }
}
