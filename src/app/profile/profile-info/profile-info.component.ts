import { Component, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidationService, UserService, AuthService } from 'app/core/services';
import { Router } from '@angular/router';

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

    constructor(private fb: FormBuilder, private userService: UserService, private auth: AuthService, private router: Router) {
        this.getCategories();
        this.userService.get()
            .subscribe((user: any) => {
                this.loggedUser = user;
                this.buildUserForm()
                this.setUserBrand();

            })
    }
    updateUser(){
        this.auth.updateUser(this.userInfoForm.value, this.loggedUser._id + '', this.userInfoForm['x-access-token']).subscribe(
            res => {
              this.auth.onAuth(res);
              this.loggedUser = res;
              this.userInfoForm.touched = false;
            },
            errorRes => {
              console.log(errorRes);
            });
    }
    buildUserForm() {
        let userModel = {
            name: ['', [Validators.required]],
            phone: [this.loggedUser.phone, [Validators.required]],
            email: [this.loggedUser.email, [ValidationService.emailValidator]],
            address: this.fb.group({
                label: [this.loggedUser.address.label, [Validators.required]],
                lat: [this.loggedUser.address.lat],
                lng: [this.loggedUser.address.lng],
            }),
            car_attributes: this.fb.group({
                brand: [this.brand],
                model: [this.models],
                category: [this.loggedUser.car_attributes.category]
            })
        };
        this.userInfoForm = this.fb.group(userModel);

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
    setUserModel(){
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
