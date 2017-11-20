import { AbstractControl, ValidatorFn } from "@angular/forms";

export function postalCodeValidator(control: AbstractControl): { [key: string]: any } {

    let postalCodeRegex = /(^\d{5}(?:[-\s]\d{4})?$)/;
    let value = control.value;

    let result = postalCodeRegex.test(value);

    if (result) {
        return null;
    } else {
        return { "postalCodeValidator": { value } }
    }
}