import { AbstractControl, ValidatorFn } from "@angular/forms";

export function selectRequiredValidator(control: AbstractControl): { [key: string]: any } {
    let value = control.value;

    if (value && value != -1) {
        return null;
    } else {
        return { "selectRequiredValidator": { value } }
    }
}
