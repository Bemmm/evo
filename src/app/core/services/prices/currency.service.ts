import { Injectable } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Injectable()
export class CurrencyService {
    private currencySign = 'USD';

    constructor(private currencyPipe: CurrencyPipe) { }

    transform(value: number | string): string {
        return this.currencyPipe.transform(value, this.currencySign, true);
    }
}
