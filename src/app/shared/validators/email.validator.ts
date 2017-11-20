import { AbstractControl, ValidatorFn } from "@angular/forms";

export function emailValidator(control: AbstractControl): { [key: string]: any } {

    let emailRegex = /[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
    let value = control.value;

    let result = emailRegex.test(value);

    if (result || !value) {
        return null;
    } else {
        return { "emailValidator": { value } }
    }
}