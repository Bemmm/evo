import { AbstractControl, ValidatorFn } from "@angular/forms";

export interface MatchValidatorModel {
    controlName: string,
    confirmControlName: string,
    matchErrorKey: string
}

export function matchValidatorCreate(models: MatchValidatorModel[]) {

    return function (AC: AbstractControl): { [key: string]: any } {

        const match = (model: MatchValidatorModel) => {
            const control = AC.get(model.controlName);
            const controlConfirm = AC.get(model.confirmControlName);

            if (control.value === controlConfirm.value) {
                controlConfirm.setErrors(null);

                return true;
            }

            controlConfirm.setErrors({
                [model.matchErrorKey]: true
            });

            return false;
        }

        const matchResults = models.map(match);

        if (matchResults.indexOf(false) === -1) {
            return null;
        }
    }

}
