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
  Validators,
  FormControl
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
} from '../../shared/models';
import {
  AuthService,
  AuthErrorsService,
  UserService,
  ApiService,
  ValidationService,
  CarsService
} from '../../core/services';
import {
  successRegistration
} from '../../shared/constants/messages';
//eslint 
// import {} from 'googlemaps';

import { OWNERSHIP_TYPES, UA, USER_ROLES, TAX_FORM_TYPES } from '../../shared/constants';
import { TransportCategoryModel, ModelModel, BrandModel } from '../../shared/models';

@Component({
  selector: 'evo-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})


export class RegisterComponent implements OnInit, OnDestroy {
  addressOptions = {
    type: '(address)',
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
  brand: any = [{
    name: 'Оберіть марку',
    value: null
  }];
  models: any = [{
    name: 'Оберіть модель',
    value: null
  }];
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
      type: ['Point'],
      coordinates: this.fb.array([
        new FormControl(),
        new FormControl()
      ])
    }),
    car_attributes: this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      category: ['']
    })
  };
  driverData = {
    name: [''],
    phone: ['', Validators.required],
    email: ['', [Validators.required]],
    passport: ['', [Validators.required]],
    birthday: ['', [Validators.required]],
    role: ['driver'],
    address: this.fb.group({
      label: ['', [Validators.required]],
      type: ['Point'],
      coordinates: this.fb.array([
        new FormControl(),
        new FormControl()
      ])
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
      type: ['Point'],
      coordinates: this.fb.array([
        new FormControl(),
        new FormControl()
      ])
    }),
    physical_address: this.fb.group({
      label: [''],
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
  };
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private authErrors: AuthErrorsService,
    private router: Router,
    private userService: UserService,
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
        this.helperModel.transportCategories.unshift({
          name: 'Оберіть категорію',
          value: null
        })
      },
      errorRes => {
        console.log(errorRes);
      });

    this.subscriptions.push(subscription);
  }
  ngOnInit() {
    this.buildForm('userData');

  }
  test() {
    
    this.registeredUser = {"x-access-token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1YjQzYjcxYTU3MmY5MjNiMTA3ZWYyN2MifQ.JLMCxyg8gdyIqBNbPjOltCW5bWzPaU6DYvrVPlPtwHU","_id":"5b43b71a572f923b107ef27c","name":"asdasdasdasdasd","phone":"380191829460","cars":[], "email":"bembenok@gmail.com","role":"user","address":{"label":"Винница, Винницкая область, Украина, 21000","type":"Point","coordinates":[49.23308299999999,28.468216900000016]},"car_attributes":{"brand":{"name":"Mitsubishi","value":52},"model":{"name":"Lancer Evolution","value":2669},"category":{"name":"Легковые","value":1}}}
    this.helperModel.ownership = 'corporate';
    this.buildForm('driverData');
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
    if (key !== 'userData') {
      this.registerForm.patchValue(this.registeredUser);
    }
    console.log(this.registerForm);
  }

  carChanged(event: any) {
    if (!event.value) {
      return;
    }
    const subscription = this.carsService.getModels(this.registerForm.get('car_attributes').get('category').value, this.registerForm.get('car_attributes').get('brand').value.value).subscribe(
      res => {
        this.models = res;
        this.models.unshift({
          name: 'Оберіть модель',
          value: null
        })
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

  setCategory(event: any) {
    console.log(event);
    this.registerForm.get('car_attributes').get('category').setValue(event.value.value);
    const subscription = this.carsService.getMarks(this.registerForm.get('car_attributes').get('category').value).subscribe(
      res => {
        this.brand = res;
        this.brand.unshift({
          name: 'Оберіть марку',
          value: null
        });
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
  getAddress(event: any, formControl: any) {
    this.registerForm.get(formControl).get('label').setValue(`${event.formatted_address}`);
    this.registerForm.get(formControl).get('coordinates').setValue([event.geometry.location.lat(), event.geometry.location.lng()]);

  }
}
