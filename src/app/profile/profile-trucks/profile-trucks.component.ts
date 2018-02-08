import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService, CarsService } from 'app/core/services';
import { TransportCategoryModel, BrandModel, ModelModel } from 'app/shared/models'
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
  //   cols = [
  //     { field: 'photo', header: 'Фото' },
  //     { field: 'registration_number', header: 'Номерний знак' },
  //     { field: 'car_attributes.brand.name', header: 'Марка' },
  //     { field: 'car_attributes.model.name', header: 'Модель' },
  //     { field: 'weight_limit', header: 'Вантажопідйомність' },
  //     { field: 'car_types', header: 'Типи' },
  //     { field: 'address[label]', header: 'Місцезнаходження' }
  // ];
    truckDialog: boolean = false;
    truckForm: any = null;
    loggedUser: any = null;
    transportCategories: TransportCategoryModel[] = null;
    brands: BrandModel[] = null;
    models: ModelModel[] = null;
    trucks: object[] = [];
    constructor(private fb: FormBuilder,
        private userService: UserService,
        private mapsAPILoader: MapsAPILoader,
        private carsService: CarsService) {
        this.userService.get()
            .subscribe((user: any) => {
                this.loggedUser = user;
                this.buildTruckForm()
            });
        this.getCategories();
        this.getBrands(4);
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
    carChanged(event: any) {
        if (!event.value) {
            return;
        }
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
        this.truckDialog = !this.truckDialog;
    }
    submitCreation(){
        this.carsService.addTruck(this.truckForm.value, this.loggedUser['x-access-token']).subscribe((res)=>{
            this.trucks.push(this.truckForm.value);
            this.truckForm.reset();
            this.truckDialog = !this.truckDialog;
        })
    }
    getFormattedAddress(event: any, formcontrol: string) {
        this.truckForm.get(formcontrol).get('label').setValue(`${event.street} ${event.street_number}, ${event.city}, ${event.state}`);
        this.truckForm.get(formcontrol).get('lat').setValue(event.lat);
        this.truckForm.get(formcontrol).get('lng').setValue(event.lng);
    }
    setTest(){
      this.truckForm.patchValue({"registration_number":"АН25522ФА","car_attributes":{"category":"4","brand":{"name":"TATA","value":78},"model":{"name":"LPT","value":2239}},"address":{"label":"вулиця Академіка Ющенка 5, Вінниця, Вінницька область","lat":49.2204699,"lng":28.44287209999993},"passengers_count":"3","weight_limit":"600","car_types":[{"name":"Легковые","value":1,"_$visited":true},{"name":"Мото","value":2,"_$visited":true}],"type":"wrecker","photo":"1","price":"12","description":"ТРАТАРАТА"});
    }

}
