export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?:any ) {
        const config = {
            'required': 'Необхідно заповнити',
            'invalidEmailAddress': 'Ви ввели неправильний e-mail',
            'invalidPassword': 'Пароль повинен бути не менше 6 символів та містити цифри.',
            'invalidComparing': 'Паролі не співпадають, перевірте введені дані',
            'invalidName': 'В цьому полі символи не припустимі',
            'minlength': `Мінімальна довжина ${validatorValue.requiredLength} символа`,
            'maxlength': `Максимальна довжина ${validatorValue.requiredLength} символів`,
            'invalidPositiveNumber': 'Сума повинна бути більше 0',
            'invalidCategoryMinLength': 'Оберіть хоча б одну категорію',
            'invalidCategoryMaxLength': 'Ви не можете обрати більше 5 категорій'
        };

        return config[validatorName];
    }

    static nameValidator(control:any) {
        if (control.value.match(/^[a-zA-ZА-Яа-яЄєЇїІі ]*$/)) {
            return null;
        } else {
            return {
                'invalidName': true
            };
        }
    }

    static emailValidator(control:any) {
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return {
                'invalidEmailAddress': true
            };
        }
    }
    
    static positiveNumberValidator(control:any) {
        if (control.value.match(/^[1-9]\d*$/)) {
            return null;
        } else {
            return {
                'invalidPositiveNumber': true
            };
        }
    }

    static passwordValidator(control:any) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*а-яА-ЯЪїЇіІєЄэЭ]{5,100}$/)) {
            return null;
        } else {
            return {
                'invalidPassword': true
            };
        }
    }

    static matchPassword(AC:any) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('password_confirmation').value; // to get value in input tag
         if(password != confirmPassword) {
            return {
                'invalidComparing': true
            };
         } else {
             return null
         }
     }

    static categoryArrayMinLength(control:any) {
        if (control && control.value && control.value.length > 0 || control && !control.value) {
            return null;
        } else {
            return {
                'invalidCategoryMinLength': true
            };
        }
    }

    static categoryArrayMaxLength(control:any) {
        if (control && control.value && control.value.length < 6 || control && !control.value) {
            return null;
        } else {
            return {
                'invalidCategoryMaxLength': true
            };
        }
    }

}