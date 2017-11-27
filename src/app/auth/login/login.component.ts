import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserModel, CompanyModel } from 'app/shared/models';
import { matchValidatorCreate } from 'app/shared/validators';
import { AuthService, AuthErrorsService, UserService } from 'app/core/services';
import { successRegistration } from 'app/shared/constants/messages';

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
        password: ['']
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
    ) {
    }

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

        const subscription = this.auth.login(this.loginForm.value.phone, this.loginForm.value.password).subscribe(
            res => {
                // this.successRegistrationMsg = res.emailActivationUsed ? this.successRegistration : this.successRegistrationWithoutEmailActivationMsg;
                // res.emailActivationUsed ? this.successRegistrationMsg = this.successRegistration : this.login(username, password);
                // this.showSuccessMessage = true;
            },
            errorRes => {
            console.log(errorRes);
            });

        this.subscriptions.push(subscription);
    }

}
