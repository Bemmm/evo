import {
    Component,
    Input
} from '@angular/core';
import {
    FormControl
} from '@angular/forms';
import {
    ValidationService
} from 'app/core/services';

@Component({
    selector: 'validation-messages',
    styleUrls: ['./validation-messages.component.scss'],
    template: `<div class="rb-error" *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})

export class ValidationMessagesComponent {
    @Input() control: FormControl;
    message: string;

    constructor() {}

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
    }

}