import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User, UserLoginResponse, UserActivateParams, Error } from 'app/shared/models';
import { UserService, SelectedPhotosService, AuthService, AuthErrorsService } from 'app/core/services';
import { ModalComponent } from 'app/shared/components';
import { accountHasBeenActivated } from 'app/shared/constants/messages';

@Component({
    selector: 'jpix-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
    @ViewChild('forgotPasswordModal') forgotPasswordModal: ModalComponent;
    @ViewChild('activateAccountModal') activateAccountModal: ModalComponent;
    @ViewChild('whyDoINeedAccountModal') whyDoINeedAccountModal: ModalComponent;
    loginForm: FormGroup;
    errorMessages: string;
    formSubmitted: boolean = false;
    showError: boolean = false;
    loginData = {
        username: ['', Validators.required],
        password: ['', Validators.required]
    };
    subscriptions: Subscription[] = [];
    emailValue: string;
    forgotPasswordMessage: string;
    forgotPasswordComplete: boolean;
    hideForgotPasswordFooter: boolean;
    forgotPasswordErrorMessages: Error[] = [];
    activateAccountQueryParams: UserActivateParams;
    activateAccountMode: boolean = false;
    activateAccountErrorMessages: Error[] = [];
    accountHasBeenActivatedMessage: string = accountHasBeenActivated;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private authErrors: AuthErrorsService,
        private router: Router,
        private userService: UserService,
        private selectedPhotosService: SelectedPhotosService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.buildForm();
        this.checkMode();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    buildForm(): void {
        this.loginForm = this.fb.group(this.loginData)
    }

    checkMode() {
        const subscription = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .do(() => {
                this.activateAccountMode = this.activatedRoute.snapshot.data['activateAccountMode']
            })
            .flatMap(() => this.activatedRoute.queryParams)
            .subscribe((params: Params) => {
                if (!this.activateAccountMode) {
                    return;
                }

                this.setActivateAccountQueryParams(params);
                this.activateAccount();
            });

        this.subscriptions.push(subscription);
    }

    setActivateAccountQueryParams(params: Params) {
        if (!(params.email && params.userId && params.uuidKey)) {
            this.router.navigateByUrl('login');
            return;
        }

        this.activateAccountQueryParams = {
            email: params.email,
            userId: params.userId,
            uuidKey: params.uuidKey
        };
    }

    activateAccount() {
        if (!this.activateAccountQueryParams) {
            return;
        }

        const subscription = this.auth.activateAccount(this.activateAccountQueryParams).subscribe(
            res => {
                this.activateAccountModal.open();
            },
            err => {
                const error = err.json();

                this.activateAccountErrorMessages = error.messages || [];
                this.activateAccountModal.open();
            });

        this.subscriptions.push(subscription);
    }

    onSubmit(): void {
        this.formSubmitted = true;
        this.showError = false;

        if (this.loginForm.invalid) {
            return;
        }

        let { username, password } = this.loginForm.value;
        username = username.toString().trim();

        const subscription = this.auth.login(username, password).subscribe(
            (res: UserLoginResponse) => {
                this.auth.onAuth(res);

                const isConsumerCare = this.userService.isConsumerCare(res.logedUser && res.logedUser.roles);

                if (isConsumerCare) {
                    this.router.navigate(['consumer-care']);
                } else {
                    this.router.navigate(['preview']);
                }
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

    initForgotPasswordDialog() {
        this.forgotPasswordMessage = 'No problem! Enter your email and we\'ll send you a link so you can create a new password.';
        this.forgotPasswordComplete = false;
        this.hideForgotPasswordFooter = true;
        this.forgotPasswordErrorMessages = [];
    }

    openForgotPasswordDialog() {
        this.initForgotPasswordDialog();
        this.forgotPasswordModal
            .open();
    }

    openWhyDoINeedAccountDialog() {
        this.whyDoINeedAccountModal
            .open();
    }

    onForgotPassword() {
        let email = this.emailValue;
        this.emailValue = '';
        this.forgotPasswordErrorMessages = [];
        this.auth.passwordResetStart(email).subscribe(
            res => {
                this.forgotPasswordMessage = 'Thanks! Your password reset has been submitted. We\'ve sent you an email with instructions on how to complete your reset.';
                this.hideForgotPasswordFooter = false
                this.forgotPasswordComplete = true;
            },
            errorRes => {
                const error = errorRes.json();

                if (!error.messages) {
                    return;
                }

                this.forgotPasswordErrorMessages = error.messages;
            });

        return false;
    }
}