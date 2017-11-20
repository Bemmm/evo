import { Injectable } from '@angular/core';

import { Error } from './error.model';

@Injectable()
export class ErrorService {
    static UNKNOWN_CODE = 'unknown';
    static PURCHASE_VALIDATION_CODE = 'purchaseValidationError';
    static PURCHASE_FOLLOWUP_CODE = 'purchaseFollowup';

    private errorsMap = {
        [ErrorService.UNKNOWN_CODE]: {
            errorTitle: 'Unknown error',
            errorMessage: 'Ups, something has gone wrong.'
        },
        [ErrorService.PURCHASE_VALIDATION_CODE]: {
            errorTitle: 'Order payment validation failed',
            errorMessage: 'Your order has been changed, you cant make a payment on changed order.'
        },
        [ErrorService.PURCHASE_FOLLOWUP_CODE]: {
            errorTitle: 'System Error',
            errorMessage: `<p><b>Thank you for ordering from Jostens.</b></p>
                           <p>We have received your order, however your payment may have not processed correctly due to our systems connectivity with our payment gateway.</p>
                           <p>Jostens will inspect your order and contact you if any additional action is necessary.</p>
                           <p>Your order confirmation will be emailed as soon as possible.</p>`
        }
    };

    getError(code: string): Error {
        if (!code && !this.errorsMap[code]) {
            return this.errorsMap[ErrorService.UNKNOWN_CODE];
        }

        return this.errorsMap[code];
    }
}
