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
  InvalidCredentials,
  ValidCredentials,
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
  LoginComponent
} from './login.component';

describe('LoginComponent', () => {
  function updateLoginForm(username: any, password: any) {
    component.loginForm.controls['username'].setValue(username);
    component.loginForm.controls['password'].setValue(password);
  };
  let component: LoginComponent;
  let fixture: ComponentFixture < LoginComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NgbModule.forRoot(),
        HttpModule,
        CoreModule,
        SharedModule
      ],
      declarations: [LoginComponent],
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

    fixture = TestBed.createComponent(LoginComponent);
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

    it('should call checkMode', () => {
      spyOn(component, 'checkMode');

      component.ngOnInit();

      expect(component.checkMode).toHaveBeenCalled();
    });

  });

  describe('buildForm', () => {

    it('loginForm should be defined', () => {
      component.buildForm();
      expect(component.loginForm).toBeTruthy();
    })

  });

  describe('checkMode', () => {

    it('subscription should be pushed in subscriptions', () => {
      component.checkMode();
      expect(component.subscriptions.length).toEqual(1);
    });

  })

  describe('setActivateAccountQueryParams', () => {

    it('should navigate to login if params are missed', () => {
      component.ngOnInit();
      let result = component.setActivateAccountQueryParams({});
      expect(result).toBeUndefined();
      expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('login');
    })

    it('should set activateAccountQueryParams', () => {
      component.ngOnInit();
      component.setActivateAccountQueryParams(fakeRoute.params.value);
      expect(component.activateAccountQueryParams.email).not.toBeUndefined;
      expect(component.activateAccountQueryParams.userId).not.toBeUndefined;
      expect(component.activateAccountQueryParams.uuidKey).not.toBeUndefined;
    })

  });

  describe('onSubmit', () => {

    it('invalid should be true when form is invalid', () => {
      component.ngOnInit();

      updateLoginForm(InvalidCredentials.username, InvalidCredentials.password);
      expect(component.loginForm.invalid).toBeTruthy();

    });

    it('invalid should be false when form is valid', () => {
      component.ngOnInit();

      updateLoginForm(ValidCredentials.username, ValidCredentials.password);

      expect(component.loginForm.invalid).toBeFalsy();
    });

    it('should call the login method from AuthService', () => {
      component.ngOnInit();
      const service = component['auth'];

      updateLoginForm(ValidCredentials.username, ValidCredentials.password);

      component.onSubmit();

      expect(service.login).toBeTruthy();
    })

    it('should redirect to the preview if user.roles has APPLICATION-JOSTENS-USER', () => {
      component.ngOnInit();
      const service = component['auth'];

      updateLoginForm(ValidCredentials.username, ValidCredentials.password);

      component.onSubmit();
      if (ResponseUser.logedUser.roles.indexOf('APPLICATION-JOSTENS-USER') != -1) {
        expect(fakeRouter.navigate).toHaveBeenCalledWith(['preview']);
      }
    })

    it('should redirect to the consumer-care if user.roles has APPLICATION-JPIX-CONSUMER_CARE', () => {
      ResponseUser.logedUser.roles = ['APPLICATION-JPIX-CONSUMER_CARE'];
      component.ngOnInit();
      const service = component['auth'];
      updateLoginForm(ValidCredentials.username, ValidCredentials.password);

      component.onSubmit();
      if (ResponseUser.logedUser.roles.indexOf('APPLICATION-JPIX-CONSUMER_CAR') !== -1) {
        expect(fakeRouter.navigate).toHaveBeenCalledWith(['consumer-care']);
      }
    })

  })

  describe('initForgotPasswordDialog', () => {

    it('should define helpers variables', () => {
      component.ngOnInit();
      component.initForgotPasswordDialog();
      expect(component.forgotPasswordMessage).toContain('new password');
      expect(component.forgotPasswordComplete).toBeFalsy();
      expect(component.hideForgotPasswordFooter).toBeTruthy();
      expect(component.forgotPasswordErrorMessages).toEqual([]);
    })

  })

  describe('openForgotPasswordDialog', () => {

    it('should init dialog window', () => {
      spyOn(component, 'initForgotPasswordDialog');
      component.ngOnInit();
      component.openForgotPasswordDialog();
      expect(component.initForgotPasswordDialog).toHaveBeenCalled;

    })

    it('should show dialog window', () => {
      spyOn(component.forgotPasswordModal, 'open');
      component.ngOnInit();
      component.openForgotPasswordDialog();
      expect(component.forgotPasswordModal.open).toHaveBeenCalled;

    })

  })


  describe('onForgotPassword', () => {

    it('should call auth.passwordResetStart', () => {
      component.ngOnInit();
      const service = component['auth'];

      component.emailValue = 'test@test.com';
      component.onForgotPassword();

      expect(service.passwordResetStart).toHaveBeenCalled;

    })

  });

  describe('activateAccount', () => {

    it('should be falsy if no queryparams is seted', () => {
      component.ngOnInit();
      component.setActivateAccountQueryParams({});

      let result = component.activateAccount();
      expect(result).toBeUndefined();
    })

    it('should call activateAccount from auth service', () => {
      component.ngOnInit();
      const service = component['auth'];

      component.setActivateAccountQueryParams(fakeRoute.params.value);
      component.activateAccount();
      expect(service.activateAccount).toHaveBeenCalled;
    })

    it('should call activateAccount from auth service', () => {
      component.ngOnInit();
      const service = component['auth'];
      component.setActivateAccountQueryParams(fakeRoute.params.value);
      component.activateAccount();
      expect(component.subscriptions.length).toEqual(2);
    })

    it('should open activateAccountModal', () => {
      spyOn(component.activateAccountModal, 'open');
      component.ngOnInit();
      const service = component['auth'];
      component.activateAccount();
      expect(component.activateAccountModal.open).toHaveBeenCalled;
    })

  });

});