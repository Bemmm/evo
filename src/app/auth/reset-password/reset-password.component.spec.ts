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
  ValidResetPasswordData,
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
  ResetPasswordComponent
} from './reset-password.component';

describe('ResetPasswordComponent', () => {
  function updateResetPasswordForm(model: any) {
    component.resetPasswordForm.controls['password'].setValue(model.password);
    component.resetPasswordForm.controls['passwordConfirm'].setValue(model.passwordConfirm);
  };
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture < ResetPasswordComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NgbModule.forRoot(),
        HttpModule,
        CoreModule,
        SharedModule
      ],
      declarations: [ResetPasswordComponent],
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

    fixture = TestBed.createComponent(ResetPasswordComponent);
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

    it('should set the queryparams variable', () => {
      expect(component.queryParams).not.toBeUndefined;
    })

  });

  describe('buildForm', () => {

    it('should init the resetPasswordForm', () => {
      component.ngOnInit();
      expect(component.resetPasswordForm).not.toBeUndefined;
    })

  });


  describe('onSubmit', () => {

    it('should init the helper variables', () => {
      component.ngOnInit();
      component.onSubmit();
      expect(component.formSubmitted).toBeTruthy;
      expect(component.errorMessages.length).toEqual(0);
      expect(component.resetPasswordForm.invalid).toBeFalsy;
    })

    it('should call the passwordReset method from AuthService', () => {
      spyOn(component, 'login');
      const service = component['auth'];
      component.ngOnInit();

      updateResetPasswordForm(ValidResetPasswordData);

      component.onSubmit();

      expect(component.login).toHaveBeenCalled();
    })

  });

  describe('login', () => {
    it('should call the onAuth method', () => {
      const service = component['auth'];
      component.ngOnInit();

      updateResetPasswordForm(ValidResetPasswordData);

      component.onSubmit();

      expect(service.onAuth).toHaveBeenCalled();
    })

    it('should redirect to the preview if user.roles has APPLICATION-JOSTENS-USER', () => {
      component.ngOnInit();
      const service = component['auth'];

      updateResetPasswordForm(ValidResetPasswordData);

      component.onSubmit();
      if (ResponseUser.logedUser.roles.indexOf('APPLICATION-JOSTENS-USER') != -1) {
        expect(fakeRouter.navigate).toHaveBeenCalledWith(['preview']);
      }
    })

    it('should redirect to the consumer-care if user.roles has APPLICATION-JPIX-CONSUMER_CARE', () => {
      ResponseUser.logedUser.roles = ['APPLICATION-JPIX-CONSUMER_CARE'];
      component.ngOnInit();
      const service = component['auth'];
      updateResetPasswordForm(ValidResetPasswordData);

      component.onSubmit();
      if (ResponseUser.logedUser.roles.indexOf('APPLICATION-JPIX-CONSUMER_CARE') !== -1) {
        expect(fakeRouter.navigate).toHaveBeenCalledWith(['consumer-care']);
      }
    })

  })


});