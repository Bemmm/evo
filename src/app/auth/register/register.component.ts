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
  ValidationService
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
interface brand {
  name: string;
  value: number;
}

interface models {
  name: string;
  value: number;
}

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
  brand: brand[] = [];
  models: models[] = [];
  registerForm: FormGroup;
  registeredUser: any = null;
  errorMessages: Error[] = [];
  helperModel: any = {
    ua: {
      firstDayOfWeek: 1,
      dayNames: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "Пятниця", "Субота"],
      dayNamesShort: ["Нед", "Пон", "Вівт", "Сер", "Четв", "Пят", "Суб"],
      dayNamesMin: ["Нд", "Пн", "Вв", "Ср", "Чт", "Пт", "Сб"],
      monthNames: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
      monthNamesShort: ['Січ', 'Лют', 'Берез', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Верес', 'Жовт', 'Листоп', 'Груд'],
      today: 'Сьогодні',
      clear: 'Очистити'
    },
    selectedCar: [{
      label: 'Оберіть модель',
      value: null
    }],
    transportCategories: [],
    ownership: null,
    userRoles: [{
        label: 'Клієнт',
        value: 'customer'
      },
      {
        label: 'Водій',
        value: 'driver'
      },
      {
        label: 'Сервіс',
        value: 'service'
      }
    ],
    taxFromTypes: [{
        label: 'Форма оплати податку',
        value: null
      },
      {
        label: 'ПДВ',
        value: 'pdv'
      },
      {
        label: 'Єдиний податок',
        value: 'ep'
      }
    ],
    ownershipTypes: [{
        label: 'ТОВ',
        value: 'TOV'
      },
      {
        label: 'ПП',
        value: 'PP'
      },
      {
        label: 'ФОП',
        value: 'FOP'
      },
      {
        label: 'Інше',
        value: 'OTHER'
      }
    ]
  };
  userData = {
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, ValidationService.passwordValidator]],
    password_confirmation: ['', [Validators.required]],
  };
  userOther = {
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
    private api: ApiService

  ) {
    this.getCategories()
  }
  getCategories() {
    const subscription = this.auth.getCategories().subscribe(
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
    console.log(this.registerForm);
  }

  carChanged(event: any) {
    if (!event.value) {
      return;
    }
    console.log(this.registerForm.get('car_attributes').get('brand').value.value);
    const subscription = this.auth.getModels(this.registerForm.get('car_attributes').get('category').value, this.registerForm.get('car_attributes').get('brand').value.value).subscribe(
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
    const subscription = this.auth.register(this.registerForm.value).subscribe(
      res => {
        this.registeredUser = res;
        // this.router.navigate(['/profile', res._id]);
      },
      errorRes => {
        console.log(errorRes);
      });

    this.subscriptions.push(subscription);
  }
  categoryChange(event: any) {
    console.log(event);
    const subscription = this.auth.getMarks(this.registerForm.get('car_attributes').get('category').value).subscribe(
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
    this.registerForm.patchValue({
      title: "TEST COMPANY",
      ownership: "TOV",
      other_ownership: "",
      id_code: "",
      zkpo: "12345678",
      tax_form: "EP",
      official_address: {
        label: "TEST",
        lat: "123",
        lng: "123"
      },
      physical_address: {
        label: "test2",
        lat: "321",
        lng: "321"
      },
      director: {
        name: "ahaha",
        phone: "380989422971"
      },
      liable: {
        name: "adada",
        phone: "380989422971"
      },
      static_phone: "123123123123",
      role: "company"
    });
    console.log(this.registerForm.value);
  } 
  getFormattedAddress(event: any, formcontrol: string) {
    this.registerForm.get(formcontrol).get('label').setValue(`${event.street} ${event.street_number}, ${event.city}, ${event.state}`);
    this.registerForm.get(formcontrol).get('lat').setValue(event.lat);
    this.registerForm.get(formcontrol).get('lng').setValue(event.lng);
    console.log(this.registerForm);
  }
}
