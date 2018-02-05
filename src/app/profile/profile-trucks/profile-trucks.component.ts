import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService, CarsService } from 'app/core/services';
import { TransportCategoryModel, BrandModel, ModelModel} from 'app/shared/models'

@Component({
    selector: 'evo-profile-trucks',
    templateUrl: 'profile-trucks.component.html',
    styleUrls: ['profile-trucks.component.scss']
})
export class ProfileTrucksComponent {
    truckDialog: boolean = false;
    truckForm: any = null;
    loggedUser: null;
    transportCategories: TransportCategoryModel[] = null;
    brands: BrandModel[] = null;
    models: ModelModel[] = null;
    trucks = [
        {
            photo: '',
            number: '321',
            car_attributes: {
                brand: '',
                model: '',
                max_size: '',
                car_types: ''
            },
            address: {
                label: '',
                lat: '',
                lng: '',

            }
        },
        {
            photo: '',
            number: '123',
            car_attributes: {
                brand: '',
                model: '',
                max_size: '',
                car_types: ''
            },
            address: {
                label: '',
                lat: '',
                lng: '',

            }
        }
    ]
    constructor(private fb: FormBuilder,
        private userService: UserService,
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
    getBrands(type:any){
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
            type: [''],
            photo: [''],
            price: [''],
            description: [''],
        }
        this.truckForm = this.fb.group(truckModel);
        // this.truckForm.patchValue(this.loggedUser)
    }
    addTruck() {
        this.truckDialog = !this.truckDialog;
    }

}
