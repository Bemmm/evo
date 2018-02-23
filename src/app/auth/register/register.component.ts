import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  NgZone,
  ElementRef
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  Subscription
} from 'rxjs/Subscription';

import {
  UserModel,
  CompanyModel
} from 'app/shared/models';
import {
  matchValidatorCreate
} from 'app/shared/validators';
import {
  AuthService,
  AuthErrorsService,
  UserService,
  ApiService,
  ValidationService,
  CarsService
} from 'app/core/services';
import {
  successRegistration
} from 'app/shared/constants/messages';
import {
  MapsAPILoader
} from '@agm/core/services/maps-api-loader/maps-api-loader';
import {
  Address
} from 'angular-google-place';
import { OWNERSHIP_TYPES, UA, USER_ROLES, TAX_FORM_TYPES } from 'app/shared/constants/';
import {TransportCategoryModel, ModelModel, BrandModel} from 'app/shared/models/'

@Component({
  selector: 'evo-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})


export class RegisterComponent implements OnInit, OnDestroy {
  addressOptions = {
    type: 'address',
    componentRestrictions: {
      country: 'UA'
    }
  };
  citiesOptions = {
    type: '(cities)',
    componentRestrictions: {
      country: 'UA',
    }
  };
  brand: BrandModel[] = [];
  models: ModelModel[] = [];
  registerForm: FormGroup;
  registeredUser: any = null;
  errorMessages: Error[] = [];
  helperModel: any = {
    selectedCar: [{
      label: 'Оберіть модель',
      value: null
    }],
    transportCategories: [],
    ownership: null,
    taxFormTypes: null,
    ownershipTypes: null,
    ua: null
  };
  userData = {
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, ValidationService.passwordValidator]],
    password_confirmation: ['', [Validators.required]],
  };
  userOther = {
    name: [''],
    email: ['', [ValidationService.emailValidator]],
    role: ['user'],
    address: this.fb.group({
      label: ['', [Validators.required]],
      lat: [''],
      lng: [''],
    }),
    car_attributes: this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      category: ['']
    })
  };
  driverData = {
    name:[''],
    email: ['', [Validators.required]],
    passport: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    role: ['driver'],
    address: this.fb.group({
      label: ['', [Validators.required]],
      lat: [''],
      lng: [''],
    }),
  }
  companyData = {
    name: [''],
    title: [''],
    ownership: ['TOV'],
    other_ownership: [''],
    id_code: [''],
    zkpo: [''],
    tax_form: [''],
    passport: [''],
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
  };
  showSuccessMessage: boolean = false;
  successRegistrationMsg = '';
  successRegistration = successRegistration;

  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private authErrors: AuthErrorsService,
    private router: Router,
    private userService: UserService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private api: ApiService,
    private carsService: CarsService
  ) {
    this.helperModel.ownershipTypes = OWNERSHIP_TYPES;
    this.helperModel.taxFormTypes = TAX_FORM_TYPES;
    this.helperModel.ua = UA;

    this.getCategories()
  }
  getCategories() {
    const subscription = this.carsService.getCategories().subscribe(
      res => {
        this.helperModel.transportCategories = res;
        console.log(res);
      },
      errorRes => {
        console.log(errorRes);
      });

    this.subscriptions.push(subscription);
  }
  ngOnInit() {
    this.buildForm('userData');

  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  changeOwnership(type: string) {
    this.helperModel.ownership = type;
    if (type == 'companies') {
      this.buildForm('companyData');
    } else if (type == 'users') {
      this.buildForm('userOther');
      // this.router.navigate(['/']);
    } else if (type == 'drivers') {
      this.buildForm('driverData');
      // this.router.navigate(['/']);
    }
  }

  buildForm(key: string) {
    this.registerForm = this.fb.group(this[key]);
    if(key !== 'userData'){
      this.registerForm.patchValue(this.registeredUser);
    }
    console.log(this.registerForm);
  }

  carChanged(event: any) {
    if (!event.value) {
      return;
    }
    console.log(this.registerForm.get('car_attributes').get('brand').value.value);
    const subscription = this.carsService.getModels(this.registerForm.get('car_attributes').get('category').value, this.registerForm.get('car_attributes').get('brand').value.value).subscribe(
      res => {
        this.models = res;
      },
      errorRes => {
        console.log(errorRes);
      });

    this.subscriptions.push(subscription);
  }

  onSubmitAdditionals() {
    const subscription = this.auth.registerAdditionals(this.registerForm.value, this.registeredUser._id + '', this.registeredUser['x-access-token']).subscribe(
      res => {
        this.auth.onAuth(res);
        this.registeredUser = res;
        this.router.navigate(['/profile', res._id]);
      },
      errorRes => {
        console.log(errorRes);
      });

    this.subscriptions.push(subscription);
  }
  onSubmit() {
    this.registerForm.value.phone = this.registerForm.value.phone.replace(/[+-]/g, '');
    const subscription = this.auth.register(this.registerForm.value).subscribe(
      res => {
        this.registeredUser = res;
      },
      errorRes => {
        console.log(errorRes);
      });

    this.subscriptions.push(subscription);
  }
  categoryChange(event: any) {
    const subscription = this.carsService.getMarks(this.registerForm.get('car_attributes').get('category').value).subscribe(
      res => {
        console.log(res);
        this.brand = res;
      },
      errorRes => {
        console.log(errorRes);
      });

    this.subscriptions.push(subscription);
  }
  setTestData() {
    this.registerForm.patchValue({ "name": "Company", "ownership": "TOV", "other_ownership": "", "id_code": "", "zkpo": "12345678", "tax_form": "pdv", "passport": "АН255346", "official_address": { "label": "вулиця Академіка Ющенка 5, Вінниця, Вінницька область", "lat": 49.2204699, "lng": 28.44287209999993 }, "physical_address": { "label": "вулиця Академіка Ющенка 5, Вінниця, Вінницька область", "lat": 49.2204699, "lng": 28.44287209999993 }, "director": { "name": "Бембенок Богдан Васильович", "phone": "+380-11-1111-111" }, "liable": { "name": "Бембенок Інна Миколаївна", "phone": "+380-11-1111-112" }, "static_phone": "222260", "role": "company" });
    console.log(this.registerForm.value);
  }
  getFormattedAddress(event: any, formcontrol: string, type:string) {
    if(type == 'city'){
      this.registerForm.get(formcontrol).get('label').setValue(`${event.city}, ${event.state}`);
    } else{
      this.registerForm.get(formcontrol).get('label').setValue(`${event.street} ${event.street_number}, ${event.city}, ${event.state}`);
    }
    this.registerForm.get(formcontrol).get('lat').setValue(event.lat);
    this.registerForm.get(formcontrol).get('lng').setValue(event.lng);
    console.log(this.registerForm);
  }
}
