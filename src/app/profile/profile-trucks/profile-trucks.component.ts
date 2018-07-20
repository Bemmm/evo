import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
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
  transportCategories: any = null;
  brands: BrandModel[] = [{
    name: 'Не обрано',
    value: null
  }];
  drivers: any = [{
    name: 'Без водія',
    _id: null
  }]
  models: ModelModel[] = [{
    name: 'Не обрано',
    value: null
  }];
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
      this.brands.unshift({
        name: 'Не обрано',
        value: null
      })
    });
  }
  myUploader(event:any) {
    //event.files == files to upload
    console.log(event);
  }
  getTrucks() {
    this.carsService.getTrucks(this.loggedUser._id, this.loggedUser['x-access-token'], this.loggedUser.role).subscribe((res) => {
      if(this.loggedUser.role == 'company'){
        if (res.results) this.trucks = res.results;
      } else{
        if (res.cars) this.trucks = res.cars;
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
    if(!this.truckForm.get('car_attributes').get('brand')){return}
    this.carsService.getModels(+this.truckForm.get('car_attributes').get('category').value.value, this.truckForm.get('car_attributes').get('brand').value.value).subscribe(
      res => {
        this.models = res;
        this.models.unshift({
          name: 'Не обрано',
          value: null
        })
      },
      errorRes => {
        console.log(errorRes);
      });

  }
  buildTruckForm() {
    let truckModel = {
      registration_number: ['', [Validators.required]],
      company_id:[this.loggedUser._id],
      company_user_id:[''],
      _id: [''],
      car_attributes: this.fb.group({
        category: [{
          name:'Спецтехника',
          value:'4'
        }],
        brand: ['', [Validators.required]],
        model: ['', [Validators.required]]
      }),
      address: this.fb.group({
        label: ['', [Validators.required]],
        type:['Point'],
        coordinates:this.fb.array([
          new FormControl(),
          new FormControl()
        ])
      }),
      passengers_count: ['', [Validators.required]],
      weight_limit: [''],
      car_types: ['', [Validators.required]],
      type: ['wrecker'],
      photo: ['http://nebula.wsimg.com/8be34569870dbd3d0d3d7a6186a0d3e9?AccessKeyId=CD25373D2C31DE4D18B4&disposition=0&alloworigin=1'],
      price: [''],
      description: ['', [Validators.required]],
    }
    this.truckForm = this.fb.group(truckModel);
    // this.truckForm.patchValue(this.loggedUser)
  }
  addTruck() {
    this.getDrivers();
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
  getAddress(event:any, formControl:any){
    console.log(event);
    this.truckForm.get(formControl).get('label').setValue(`${event.formatted_address}`);
    this.truckForm.get(formControl).get('coordinates').setValue([event.geometry.location.lat(), event.geometry.location.lng()]);
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
    this.getDrivers();
    this.truckForm.editMode = true;
    this.truckForm.patchValue(truck);
    this.truckForm.get('car_types').setValue('');
    this.carChanged();
    this.truckDialog = !this.truckDialog;
  }
  clearForm() {
    this.models = null;
    this.truckForm.editMode = null;
    this.truckForm.reset();
  }
}
