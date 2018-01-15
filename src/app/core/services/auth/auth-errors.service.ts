import { Injectable } from '@angular/core';

@Injectable()
export class AuthErrorsService {
    private errors:any[] = [
        {errorCode: 401, errorMessage: 'The email or password you entered is incorrect.'},
        {errorCode: 403, errorMessage: 'Forbidden access denied.'}
    ];

    getMessageByCode(code: number): string {
        const errors = this.errors.filter(error => error.errorCode === code);
        return errors.length ? errors[0].errorMessage : 'Error';
    }
}
