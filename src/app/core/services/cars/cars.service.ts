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
  export class CarsService {
    private addTruckUrl: string = 'car';
    private addCompanyTruckUrl: string = 'company/car';
    private deleteTruckUrl: string = 'car';
    private deleteCompanyTruckUrl: string = 'company/cars';
    private getTrucksUrl: string = 'cars';
    private getCompanyTrucksUrl: string = 'company/cars';
    private categories: string = 'categories';
    private marks: string = 'marks';
    private models: string = 'models';

    constructor(
      private api: ApiService
    ) {}

    getCategories(){
      return this.api.get(`${this.categories}`);
    }
    getMarks(categoryId:any){
      return this.api.get(`${this.marks}/${categoryId}`);
    }
    getModels(categoryId:any, markId:any){
      return this.api.get(`${this.models}/${categoryId}/${markId}`);
    }
    addTruck(model: any, token?:string, role?:string): Observable < any > {
      return this.api.post(`${role == 'company' ? this.addCompanyTruckUrl: this.addTruckUrl}`, model, token);
    }
    editTruck(model: any, token?:string, role?:string): Observable < any > {
      return this.api.put(`${role == 'company' ? this.addCompanyTruckUrl: this.addTruckUrl}/${model._id}`, model, token);
    }
    getTrucks(userId: any, token?:string, role?:string): Observable < any > {
      return this.api.get(`${role == 'company' ? this.getTrucksUrl : this.getTrucksUrl }/${userId}`, null, token);
    }
    deleteTruck(truckId:any, token?:string, role?:string){
      return this.api.delete(`${role == 'company' ? this.deleteCompanyTruckUrl : this.deleteTruckUrl}/${truckId}`, null, token);

    }
  }
