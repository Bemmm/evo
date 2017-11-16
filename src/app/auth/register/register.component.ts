import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User, UserLoginResponse, Error } from 'app/shared/models';
import { matchValidatorCreate } from 'app/shared/validators';
import { AuthService, AuthErrorsService, UserService } from 'app/core/services';
import { successRegistration } from 'app/shared/constants/messages';

@Component({
    selector: 'evo-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    registerForm: FormGroup;
    errorMessages: Error[] = [];
    formSubmitted: boolean = false;
    showError: boolean = false;
    registerData = {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        usernameConfirm: [''],
        password: ['', Validators.required],
        passwordConfirm: ['']
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
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    buildForm() {
        const usernameMatchModel = {
            controlName: 'username',
            confirmControlName: 'usernameConfirm',
            matchErrorKey: 'usenameMatchError'
        };
        const passwordMatchModel = {
            controlName: 'password',
            confirmControlName: 'passwordConfirm',
            matchErrorKey: 'passwordMatchError'
        };

        this.registerForm = this.fb.group(this.registerData,
            {
                validator: matchValidatorCreate([usernameMatchModel, passwordMatchModel])
            });
    }

    onSubmit(): void {
        this.formSubmitted = true;
        this.showError = false;
        this.showSuccessMessage = false;

        if (this.registerForm.invalid) {
            return;
        }

        let { firstName, lastName, username, password } = this.registerForm.value;
        username = username.toString().trim();

        const subscription = this.auth.register(firstName, lastName, username, password).subscribe(
            res => {
                if (!res.success) {

                    return;
                }

                if (res.messages) {
                    this.showError = true;
                    this.errorMessages = res.messages;
                    return;
                }

                // this.successRegistrationMsg = res.emailActivationUsed ? this.successRegistration : this.successRegistrationWithoutEmailActivationMsg;
                res.emailActivationUsed ? this.successRegistrationMsg = this.successRegistration : this.login(username, password);
                // this.showSuccessMessage = true;
            },
            errorRes => {
                this.showError = true;

                const error = errorRes.json();

                if (!error.messages) {
                    return;
                }

                this.errorMessages = error.messages;
            });

        this.subscriptions.push(subscription);
    }

}
