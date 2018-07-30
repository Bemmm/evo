import { Component, Input } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { ValidationService, UserService, AuthService, CarsService } from 'app/core/services';
import { Router } from '@angular/router';
import {
  MapsAPILoader
} from '@agm/core/services/maps-api-loader/maps-api-loader';
import {
  Address
} from 'angular-google-place';
import { OWNERSHIP_TYPES, UA, USER_ROLES, TAX_FORM_TYPES } from 'app/shared/constants/';
import { TransportCategoryModel, BrandModel, ModelModel } from 'app/shared/models/';
@Component({
  selector: 'evo-profile-info',
  templateUrl: 'profile-info.component.html',
  styleUrls: ['profile-info.component.scss']
})
export class ProfileInfoComponent {
  ua = UA;
  ownershipTypes = OWNERSHIP_TYPES;
  selectedCategory: any = null;
  taxFormTypes = TAX_FORM_TYPES;
  transportDialog: boolean = false;
  loggedUser: any = null;
  userInfoForm: any = null;
  transportCategories: TransportCategoryModel[] = null;
  brand: BrandModel[] = null;
  models: ModelModel[] = null;
  addressOptions = {
    type: 'address',
    componentRestrictions: {
      country: 'UA'
    }
  };

  constructor(private fb: FormBuilder, private userService: UserService, private carsService: CarsService, private auth: AuthService, private router: Router, private mapsAPILoader: MapsAPILoader) {
    this.userService.get()
      .subscribe((user: any) => {
        this.loggedUser = user;
        this.getCategories();
        this.buildUserForm(user.role)
        if (user.role == 'user') {
          this.setUserBrand();
        }

      });

  }

  getAddress(event: any, formcontrol: string) {
    this.userInfoForm.get(formcontrol).get('label').setValue(`${event.formatted_address}`);
    this.userInfoForm.get(formcontrol).get('coordinates').setValue([event.geometry.location.lat(), event.geometry.location.lng()]);

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
          type: ['Point'],
          coordinates: this.fb.array([
            new FormControl(),
            new FormControl()
          ])
        }),
        role: ['user']
      },
      driver: {
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [ValidationService.emailValidator]],
        passport: ['', [Validators.required]],
        birthday: ['', [Validators.required]],
        address: this.fb.group({
          label: ['', [Validators.required]],
          type: ['Point'],
          coordinates: this.fb.array([
            new FormControl(),
            new FormControl()
          ])
        }),
        role: ['driver']
      },
      company: {
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        email: ['', [ValidationService.emailValidator]],
        title: [''],
        passport: [''],
        ownership: ['TOV'],
        other_ownership: [''],
        id_code: [''],
        zkpo: [''],
        tax_form: [''],
        official_address: this.fb.group({
          label: ['', [Validators.required]],
          type: ['Point'],
          coordinates: this.fb.array([
            new FormControl(),
            new FormControl()
          ])
        }),
        physical_address: this.fb.group({
          label: ['', [Validators.required]],
          type: ['Point'],
          coordinates: this.fb.array([
            new FormControl(),
            new FormControl()
          ])
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
    this.userInfoForm.patchValue(this.loggedUser)
  }

  getCategories() {
    this.carsService.getCategories().subscribe(
      res => {
        this.transportCategories = res;
        res.map((item: any) => {
          if (this.userInfoForm.get('role').value == 'user' && item.value == this.userInfoForm.get('car_attributes').get('category').value) this.selectedCategory = item;
        })
      },
      errorRes => {
        console.log(errorRes);
      });
  }

  setUserBrand() {
    this.carsService.getMarks(this.loggedUser.car_attributes.category).subscribe(
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
    this.carsService.getModels(this.loggedUser.car_attributes.category, this.loggedUser.car_attributes.brand.value).subscribe(
      res => {
        this.models = res;
        this.userInfoForm.get('car_attributes').get('model').setValue(this.loggedUser.car_attributes.model);

      },
      errorRes => {
        console.log(errorRes);
      });

  }

  setCategory(event: any) {
    this.selectedCategory = event;
    this.models = [];
    this.models.unshift({
      name: 'Оберіть модель',
      value: null
    });
    this.userInfoForm.get('car_attributes').get('category').setValue(event.value);
    this.carsService.getMarks(this.userInfoForm.get('car_attributes').get('category').value).subscribe(
      res => {
        this.transportDialog = !this.transportDialog;
        this.brand = res;
        this.brand.unshift({
          name: 'Оберіть марку',
          value: null
        });
      },
      errorRes => {
        console.log(errorRes);
      });
  }
  carChanged(event: any) {
    this.models.unshift({
      name: 'Оберіть Модель',
      value: null
    });
    if (!event.value) {
      return;
    }
    this.carsService.getModels(this.userInfoForm.get('car_attributes').get('category').value, this.userInfoForm.get('car_attributes').get('brand').value.value).subscribe(
      res => {
        this.models = res;
        this.models.unshift({
          name: 'Оберіть Модель',
          value: null
        });
      },
      errorRes => {
        console.log(errorRes);
      });

  }

  showTransportDialog() {
    this.transportDialog = !this.transportDialog;

  }
}
