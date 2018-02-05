import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService, CarsService } from 'app/core/services';

@Component({
    selector: 'evo-profile-trucks',
    templateUrl: 'profile-trucks.component.html',
    styleUrls: ['profile-trucks.component.scss']
})
export class ProfileTrucksComponent {
    truckDialog: boolean = false;
    truckForm: any = null;
    loggedUser: null;
    transportCategories: null;
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
    truckData = {
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        passport: ['', [Validators.required]],
        birthday: ['', [Validators.required]],
        address: this.fb.group({
            label: ['', [Validators.required]],
            lat: [''],
            lng: [''],
        }),
        role: ['driver']
    }
    constructor(private fb: FormBuilder,
        private userService: UserService,
        private carsService: CarsService) {
        this.userService.get()
            .subscribe((user: any) => {
                this.loggedUser = user;
                this.buildTruckForm()
            });
        this.getCategories();
    }

    getCategories() {
        this.carsService.getCategories().subscribe((res) => {
            this.transportCategories = res;
        });
    }
    buildTruckForm() {
        let truckModel = {
            car_attributes: this.fb.group({
                category: [''],
                brand: [''],
                model: ['']
            })
        }
        this.truckForm = this.fb.group(truckModel);
        // this.truckForm.patchValue(this.loggedUser)
    }
    addTruck() {
        this.truckDialog = !this.truckDialog;
    }

}
