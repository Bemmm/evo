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
  private editTruckUrl: string = 'cars';
  private deleteTruckUrl: string = 'car';
  private deleteCompanyTruckUrl: string = 'company/cars';
  private getTrucksUrl: string = 'cars';
  private getCompanyTrucksUrl: string = 'company/cars';
  private categories: string = 'categories';
  private marks: string = 'marks';
  private models: string = 'models';
  private searchCars: string = 'search-cars'
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
  getNearCars(lat: any, lng: any, token?: string) {
    return this.api.get(`${this.searchCars}/${lat}/${lng}`, null, token);
  }
  getTruckInfo(truckId: any, token?: string){
    return Observable.of({
      "registration_number": "АН255356",
      "company_id": "5aabc25a3223340004b65a62",
      "company_user_id": "",
      "_id": "",
      "car_attributes": {
        "category": "4",
        "brand": {
          "name": "TATA",
          "value": 78
        }, "model": {
          "name": "LPT",
          "value": 2239
        }
      },
      "address": {
        "label": "Ющенка 5",
        "lat": 49.2202179,
        "lng": 28.4429107
      },
      "user": {
        "phone": '+380989422971',
        "name": 'Oleh'
      },
      "passengers_count": "12",
      "weight_limit": "600",
      "car_types": [
        {
          "name": "Легковые",
          "value": 1
        },
        {
          "name": "Мото",
          "value": 2
        },
        {
          "name": "Водный транспорт",
          "value": 3
        }
      ],
      "type": "wrecker",
      "photo": "1",
      "price": "24",
      "description": "фівфівфівфів"
    })
  }
}
