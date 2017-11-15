import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  DebugElement,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import {
  RouterTestingModule
} from '@angular/router/testing';
import {
  NavigationEnd,
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  HttpModule
} from '@angular/http';
import {
  Subject
} from 'rxjs/Subject';
import {
  Observable
} from 'rxjs/Observable';
import {
  CoreModule
} from 'app/core/core.module';
import {
  SharedModule
} from 'app/shared/shared.module';
import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
import {
  AuthService
} from 'app/core/services';
import {
  ValidRegistrationData,
  ResponseUser,
  fakeRoute,
  fakeRouter,
  fakeData,
  fakeQueryParams
} from './../../../test/mock/auth';
import {
  fakeAuthService
} from './../../../test/mock/services';
import {
  RegisterComponent
} from './register.component';

describe('RegisterComponent', () => {
  function updateLoginForm(model: any) {
    component.registerForm.controls['firstName'].setValue(model.firstName);
    component.registerForm.controls['lastName'].setValue(model.lastName);
    component.registerForm.controls['username'].setValue(model.username);
    component.registerForm.controls['usernameConfirm'].setValue(model.usernameConfirm);
    component.registerForm.controls['password'].setValue(model.password);
    component.registerForm.controls['passwordConfirm'].setValue(model.passwordConfirm);
  };
  let component: RegisterComponent;
  let fixture: ComponentFixture < RegisterComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NgbModule.forRoot(),
        HttpModule,
        CoreModule,
        SharedModule
      ],
      declarations: [RegisterComponent],
      providers: [{
          provide: AuthService,
          useValue: fakeAuthService
        },
        {
          provide: Router,
          useValue: fakeRouter
        },
        {
          provide: ActivatedRoute,
          useValue: fakeRoute
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  }));

  it('should be compiled', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should call buildForm', () => {
      spyOn(component, 'buildForm');

      component.ngOnInit();

      expect(component.buildForm).toHaveBeenCalled();
    });

  });

  describe('buildForm', () => {

    it('should init the registerForm', () => {
      component.ngOnInit();
      expect(component.registerForm).not.toBeUndefined;
    })

  });

  describe('onSubmit', () => {

    it('should init the helper variables', () => {
      component.ngOnInit();
      component.onSubmit();
      expect(component.formSubmitted).toBeTruthy;
      expect(component.showError).toBeFalsy;
      expect(component.showSuccessMessage).toBeFalsy;
    })

    // it('should call the register method from AuthService', () => {
    //   component.ngOnInit();
    //   const service = component['auth'];

    //   updateLoginForm(ValidRegistrationData);

    //   component.onSubmit();

    //   expect(component.showSuccessMessage).toBeTruthy();
    // })

  });


});