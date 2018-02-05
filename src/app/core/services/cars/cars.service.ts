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
    addTruck(model: any): Observable < any > {
      return this.api.post(`${this.addTruckUrl}`, model);
    }

  }
  