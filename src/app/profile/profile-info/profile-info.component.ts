import { Component, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidationService, UserService, AuthService } from 'app/core/services';
import { Router } from '@angular/router';
import {
    MapsAPILoader
} from '@agm/core/services/maps-api-loader/maps-api-loader';
import {
    Address
} from 'angular-google-place';
@Component({
    selector: 'evo-profile-info',
    templateUrl: 'profile-info.component.html',
    styleUrls: ['profile-info.component.scss']
})
export class ProfileInfoComponent {
    transportDialog: boolean = false;
    loggedUser: any = null;
    userInfoForm: any = null;
    transportCategories: any = null;
    brand: any = null;
    models: any = null;
    addressOptions = {
        type: 'address',
        componentRestrictions: {
          country: 'UA'
        }
      };
    ua = {
        firstDayOfWeek: 1,
        dayNames: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "Пятниця", "Субота"],
        dayNamesShort: ["Нед", "Пон", "Вівт", "Сер", "Четв", "Пят", "Суб"],
        dayNamesMin: ["Нд", "Пн", "Вв", "Ср", "Чт", "Пт", "Сб"],
        monthNames: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
        monthNamesShort: ['Січ', 'Лют', 'Берез', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Верес', 'Жовт', 'Листоп', 'Груд'],
        today: 'Сьогодні',
        clear: 'Очистити'
      }

    constructor(private fb: FormBuilder, private userService: UserService, private auth: AuthService, private router: Router, private mapsAPILoader: MapsAPILoader) {
        this.getCategories();
        this.userService.get()
            .subscribe((user: any) => {
                this.loggedUser = user;
                this.buildUserForm(user.role)
                if (user.role == 'user') {
                    this.setUserBrand();
                }         

            });

    }

    getFormattedAddress(event: any, formcontrol: string) {
        this.userInfoForm.get(formcontrol).get('label').setValue(`${event.street} ${event.street_number}, ${event.city}, ${event.state}`);
        this.userInfoForm.get(formcontrol).get('lat').setValue(event.lat);
        this.userInfoForm.get(formcontrol).get('lng').setValue(event.lng);
        console.log(this.userInfoForm);
    }

    updateUser() {
        this.auth.updateUser(this.userInfoForm.value, this.loggedUser._id + '', this.loggedUser['x-access-token']).subscribe(
            res => {
                this.auth.onAuth(res);
                this.loggedUser = res;
                this.userInfoForm.patchValue(this.loggedUser);
                this.userInfoForm.touched = false;
                
            },
            errorRes => {
                console.log(errorRes);
            });
    }
    buildUserForm(type: string) {
        let formTypes = {
            user: {
                name: ['', [Validators.required]],
                phone: ['', [Validators.required]],
                email: ['', [ValidationService.emailValidator]],
                car_attributes: this.fb.group({
                    category: [''],
                    brand: [''],
                    model: ['']
                }),
                address: this.fb.group({
                    label: ['', [Validators.required]],
                    lat: [''],
                    lng: [''],
                }),
                role:['user']
            },
            driver: {
                name: ['', [Validators.required]],
                phone: ['', [Validators.required]],                                
                email: ['', [ValidationService.emailValidator]],
                passport: ['', [Validators.required]],
                birthday: ['', [Validators.required]],
                address: this.fb.group({
                    label: ['', [Validators.required]],
                    lat: [''],
                    lng: [''],
                }),
                role:['driver']                
            },
            company: {
                name: ['', [Validators.required]],
                phone: ['', [Validators.required]],                                
                email: ['', [ValidationService.emailValidator]],                
                title: [''],
                ownership: ['TOV'],
                other_ownership: [''],
                id_code: [''],
                zkpo: [''],
                tax_form: [''],
                official_address: this.fb.group({
                  label: [''],
                  lat: [''],
                  lng: ['']
                }),
                physical_address: this.fb.group({
                  label: [''],
                  lat: [''],
                  lng: ['']
                }),
                director: this.fb.group({
                  name: [''],
                  phone: [''],
                }),
                liable: this.fb.group({
                  name: [''],
                  phone: [''],
                }),
                static_phone: [''],
                role: ['company'],
              }
        };
        this.userInfoForm = this.fb.group(formTypes[type]);
        if(this.loggedUser.birthday){
            this.loggedUser.birthday = new Date(this.loggedUser.birthday);
        }
        this.userInfoForm.patchValue(this.loggedUser)
    }

    getCategories() {
        this.auth.getCategories().subscribe(
            res => {
                this.transportCategories = res;
                console.log(res);
            },
            errorRes => {
                console.log(errorRes);
            });
    }

    setUserBrand() {
        this.auth.getMarks(this.loggedUser.car_attributes.category).subscribe(
            res => {
                this.brand = res;
                this.userInfoForm.get('car_attributes').get('brand').setValue(this.loggedUser.car_attributes.brand);
                this.setUserModel();
            },
            errorRes => {
                console.log(errorRes);
            });
    }
    setUserModel() {
        this.auth.getModels(this.loggedUser.car_attributes.category, this.loggedUser.car_attributes.brand.value).subscribe(
            res => {
                this.models = res;
                this.userInfoForm.get('car_attributes').get('model').setValue(this.loggedUser.car_attributes.model);

            },
            errorRes => {
                console.log(errorRes);
            });

    }
    categoryChange() {
        this.brand = null;
        this.models = null;
        this.auth.getMarks(this.userInfoForm.get('car_attributes').get('category').value).subscribe(
            res => {
                this.brand = res;
                this.transportDialog = !this.transportDialog;

            },
            errorRes => {
                console.log(errorRes);
            });
    }

    carChanged(event: any) {
        this.models = null;
        if (!event.value) {
            return;
        }
        this.auth.getModels(this.userInfoForm.get('car_attributes').get('category').value, this.userInfoForm.get('car_attributes').get('brand').value.value).subscribe(
            res => {
                this.models = res;
            },
            errorRes => {
                console.log(errorRes);
            });

    }

    showTransportDialog() {
        this.transportDialog = !this.transportDialog;

    }
}
