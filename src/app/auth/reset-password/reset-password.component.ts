import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User, UserLoginResponse, Error } from 'app/shared/models';
import { matchValidatorCreate } from 'app/shared/validators';
import { AuthService, AuthErrorsService, UserService } from 'app/core/services';

@Component({
    selector: 'jpix-reset-password',
    templateUrl: 'reset-password.component.html',
    styleUrls: ['reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordForm: FormGroup;
    errorMessages: string[];
    formSubmitted: boolean = false;
    disableButton: boolean = false;
    resetPasswordData = {
        password: ['', Validators.required],
        passwordConfirm: ['']
    };

    queryParams: any;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private authErrors: AuthErrorsService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
    ) { }

    ngOnInit() {
        this.buildForm();
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            if (!(params.email && params.userId && params.uuidKey)) {
                this.router.navigate(['login']);
            } else {
                this.queryParams = {
                    email: params.email,
                    userId: params.userId,
                    uuidKey: params.uuidKey
                };
            }
        });
    }

    buildForm() {
        const passwordMatchModel = {
            controlName: 'password',
            confirmControlName: 'passwordConfirm',
            matchErrorKey: 'passwordMatchError'
        };

        this.resetPasswordForm = this.fb.group(this.resetPasswordData,
            {
                validator: matchValidatorCreate([passwordMatchModel])
            });
    }

    onSubmit(): void {
        this.formSubmitted = true;
        this.errorMessages=[];

        if (this.resetPasswordForm.invalid) {
            return;
        }

        let { password } = this.resetPasswordForm.value;
        this.queryParams.password = password;
        this.disableButton = true;

        this.auth.passwordReset(this.queryParams).subscribe(
            res => {
                if (res.success) {
                    this.login(this.queryParams.email, this.queryParams.password);
                }
            },
            errorRes => {
                 const err = errorRes.json();
                 if (!err.messages) {
                    return;
                }
                this.errorMessages = err.messages;
                this.formSubmitted = false;
                this.disableButton = false;
            });
    }

    login(username: string, password: string) {
        this.auth.login(username, password).subscribe(
            (res: UserLoginResponse) => {
                this.auth.onAuth(res);

                const isConsumerCare = this.userService.isConsumerCare(res.logedUser && res.logedUser.roles);

                if (isConsumerCare) {
                    this.router.navigate(['consumer-care']);
                } else {
                    this.router.navigate(['preview']);
                }
            })
    }

}