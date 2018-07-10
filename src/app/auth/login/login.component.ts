import {
  Component,
  OnInit,
  OnDestroy
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
  UserService
} from 'app/core/services';
import {
  successRegistration
} from 'app/shared/constants/messages';
import { WarningService } from 'app/core/services/warning/warning.service';

@Component({
  selector: 'evo-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errorMessages: Error[] = [];
  formSubmitted: boolean = false;
  helperModel: any = {};
  loginData = {
    phone: ['', Validators.required],
    password: ['', Validators.required]
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
    private warningService: WarningService

  ) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  buildForm() {
    this.loginForm = this.fb.group(this.loginData);
  }

  onSubmit() {
    this.formSubmitted = true;
    this.loginForm.value.phone = this.loginForm.value.phone.replace(/[+-]/g, '');
    const subscription = this.auth.login(this.loginForm.value.phone, this.loginForm.value.password).subscribe(
      res => {
        this.auth.onAuth(res);
        this.router.navigate(['/profile', res._id]);
      },
      errorRes => {
        console.log('error');
        this.warningService.show('error', 'Упс, сталася помилка:', 'Перевірте будь ласка введені данні');
      });

    this.subscriptions.push(subscription);
  }

}
