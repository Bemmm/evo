import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { UserModel, CompanyModel } from 'app/shared/models';
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
    helperModel: any = {
        ownership: null,
        userRoles:[
            {label: 'Клієнт', value: 'customer'},
            {label: 'Водій', value: 'driver'},
            {label: 'Сервіс', value: 'service'}            
        ],
        taxFromTypes:[
            {label: 'Форма оплати податку', value: null},
            {label: 'ПДВ', value: 'simple'},
            {label: 'Єдиний податок', value: 'vat'}             
        ],
        ownershipTypes:[
            {label: 'limited', value: 'limited'},
            {label: 'PE', value: 'pe'},
            {label: 'Інше', value: 'other'}            
        ],                
        brand: [
            {label: 'Оберіть авто', value: null},
            {label: 'Audi', value: 'Audi'},
            {label: 'BMW', value: 'BMW'},
            {label: 'Fiat', value: 'Fiat'},
            {label: 'Ford', value: 'Ford'},
            {label: 'Honda', value: 'Honda'},
            {label: 'Jaguar', value: 'Jaguar'},
            {label: 'Mercedes', value: 'Mercedes'},
            {label: 'Renault', value: 'Renault'},
            {label: 'VW', value: 'VW'},
            {label: 'Volvo', value: 'Volvo'},
        ]
    };
    userData = {
        name: ['', Validators.required],
        phone: [''],
        password: [''],
        password_confirmation: [''],
        email: [''],
        car: [''],
        role: [''],
    };
    companyData = {
        title: ['', Validators.required],
        zkpo: ['', Validators.required],
        ownership: ['', Validators.required],
        tax_form: ['', Validators.required],
        official_address: ['', Validators.required],
        physical_address: ['', Validators.required],
        manager_name: ['', Validators.required],
        manager_phone: ['', Validators.required],
        liable_name: ['', Validators.required],
        liable_phone: ['', Validators.required],
        additional_info: [''],
        phone: [''],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required],
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
        // this.buildForm();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    changeOwnership(type:string){
        this.helperModel.ownership = type;
        if(type == 'companies'){
            this.buildForm('companyData');
        } else if(type == 'users'){
            this.buildForm('userData');
        }
    }

    buildForm(key:string) {
        this.registerForm = this.fb.group(this[key]);
    }

    onSubmit() {
        this.formSubmitted = true;

        const subscription = this.auth.register(this.helperModel.ownership, this.registerForm.value).subscribe(
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
