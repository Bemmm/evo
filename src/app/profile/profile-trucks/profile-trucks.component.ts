import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService, CarsService, DriversService } from 'app/core/services';
import { TransportCategoryModel, BrandModel, ModelModel, DriverModel } from 'app/shared/models'
import {
  MapsAPILoader
} from '@agm/core/services/maps-api-loader/maps-api-loader';

@Component({
  selector: 'evo-profile-trucks',
  templateUrl: 'profile-trucks.component.html',
  styleUrls: ['profile-trucks.component.scss']
})
export class ProfileTrucksComponent {
  addressOptions = {
    type: 'address',
    componentRestrictions: {
      country: 'UA'
    }
  };

  truckDialog: boolean = false;
  truckForm: any = null;
  loggedUser: any = null;
  transportCategories: TransportCategoryModel[] = null;
  brands: BrandModel[] = null;
  drivers: any = [];
  models: ModelModel[] = null;
  trucks: object[] = [];
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private mapsAPILoader: MapsAPILoader,
    private driversService: DriversService,
    private carsService: CarsService) {
    this.userService.get()
      .subscribe((user: any) => {
        this.loggedUser = user;
        if(user.role == 'company'){this.getDrivers()};
        this.buildTruckForm()
      });
    this.getCategories();
    this.getBrands(4);
    this.getTrucks();
  }

  getCategories() {
    this.carsService.getCategories().subscribe((res) => {
      this.transportCategories = res;
    });
  };
  getBrands(type: any) {
    this.carsService.getMarks(type).subscribe((res) => {
      this.brands = res;
    });
  }
  getTrucks() {
    this.carsService.getTrucks(this.loggedUser._id, this.loggedUser['x-access-token'], this.loggedUser.role).subscribe((res) => {
      if(this.loggedUser.role == 'company'){
        this.trucks = res.results;        
      } else{
        this.trucks = res.cars;
      }
    });
  };
  getDrivers(){
    this.driversService.getDrivers(this.loggedUser._id, this.loggedUser['x-access-token']).subscribe((res)=>{
      this.drivers= res.users;
      this.drivers.unshift({
        name: 'Без Водія',
        _id: null
      });
    })
  }
  carChanged() {
    this.carsService.getModels(+this.truckForm.get('car_attributes').get('category').value, this.truckForm.get('car_attributes').get('brand').value.value).subscribe(
      res => {
        this.models = res;
      },
      errorRes => {
        console.log(errorRes);
      });

  }
  buildTruckForm() {
    let truckModel = {
      registration_number: [''],
      company_id:[this.loggedUser._id],
      company_user_id:[''],
      _id: [''],
      car_attributes: this.fb.group({
        category: ['4'],
        brand: [''],
        model: ['']
      }),
      address: this.fb.group({
        label: ['', [Validators.required]],
        lat: [''],
        lng: [''],
      }),
      passengers_count: [''],
      weight_limit: [''],
      car_types: [''],
      type: ['wrecker'],
      photo: ['1'],
      price: [''],
      description: [''],
    }
    this.truckForm = this.fb.group(truckModel);
    // this.truckForm.patchValue(this.loggedUser)
  }
  addTruck() {
    this.truckForm.editMode = false;
    this.truckDialog = !this.truckDialog;
  }
  submitCreation(mode: string) {
    console.log(this.truckForm);
    if(this.truckForm.value.company_user_id){
      this.truckForm.value.company_user_id = this.truckForm.value.company_user_id._id
    }
    if (mode == 'editMode') {
      this.carsService.editTruck(this.truckForm.value, this.loggedUser['x-access-token'], this.loggedUser.role).subscribe((res) => {
        this.trucks.push(this.truckForm.value);
        this.truckForm.reset();
        this.truckDialog = !this.truckDialog;
      })
    } else {
      this.carsService.addTruck(this.truckForm.value, this.loggedUser['x-access-token'], this.loggedUser.role).subscribe((res) => {
        this.trucks.push(res.car);
        this.truckForm.reset();
        this.truckDialog = !this.truckDialog;
      })
    }
  }
  getFormattedAddress(event: any, formcontrol: string) {
    this.truckForm.get(formcontrol).get('label').setValue(`${event.street} ${event.street_number}, ${event.city}, ${event.state}`);
    this.truckForm.get(formcontrol).get('lat').setValue(event.lat);
    this.truckForm.get(formcontrol).get('lng').setValue(event.lng);
  }
  setTest() {
    this.truckForm.patchValue({ "registration_number": "АН25522ФА", "car_attributes": { "category": "4", "brand": { "name": "TATA", "value": 78 }, "model": { "name": "LPT", "value": 2239 } }, "address": { "label": "вулиця Академіка Ющенка 5, Вінниця, Вінницька область", "lat": 49.2204699, "lng": 28.44287209999993 }, "passengers_count": "3", "weight_limit": "600", "type": "wrecker", "photo": "1", "price": "12", "description": "ТРАТАРАТА" });
  }
  deleteTruck(truck: any) {
    this.carsService.deleteTruck(truck._id, this.loggedUser['x-access-token'], this.loggedUser.role).subscribe((res) => {
      let index = this.trucks.indexOf(truck);
      if (index !== -1) {
        this.trucks.splice(index, 1);
      }
    })
  }
  editTruck(truck: any) {
    this.truckForm.editMode = true;
    this.truckForm.patchValue(truck)
    this.carChanged();
    this.truckDialog = !this.truckDialog;
  }
  clearForm() {
    this.models = null;
    this.truckForm.editMode = null;
    this.truckForm.reset();
  }
}
