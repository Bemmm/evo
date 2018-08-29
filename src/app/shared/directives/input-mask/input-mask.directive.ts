import { Directive, Input, OnInit, ElementRef, HostListener, Renderer, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { isInteger, isNumber } from '../../helpers';
import { emoji } from '../../constants/regexp';

const TRIM_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(() => TrimValueAccessorDirective),
    multi: true
};

@Directive({
    selector: `input[evoInputMask]:not([type=checkbox])[formControlName],
    textarea[evoInputMask][formControlName],
    input[evoInputMask]:not([type=checkbox])[formControl],
    textarea[evoInputMask][formControl],
    input[evoInputMask]:not([type=checkbox])[ngModel],
    textarea[evoInputMask][ngModel],[ngDefaultControl]`,
    providers: [TRIM_VALUE_ACCESSOR]
})
export class TrimValueAccessorDirective implements ControlValueAccessor, OnInit {
    @Input() trim: boolean;
    @Input() max: number;
    @Input() min: number;
    @Input() maxLength: number;
    @Input() integer: boolean;
    @Input() avoid: string;
    @Input() allowOnlyTwoDecimals: boolean;
    @Input() avoidEmoji: boolean;

    private prevValue: any;

    private helpers = {
        trim: (value: any) => value.toString().trim(),
        max: (value: any) => {
            if (!isNumber(value) && value > this.max) {
                return this.prevValue;
            }

            return value;
        },
        min: (value: any) => {
            if (!isNumber(value) && value < this.min) {
                return this.prevValue === '-' ? '' : this.prevValue;
            }

            return value;
        },
        integer: (value: any) => {
            if (value === '' || value === null) {
                return value;
            }

            const parsed = parseInt(value, 10);

            if (!isInteger(parsed)) {
                return this.prevValue;
            }

            return parsed;
        },
        avoid: (value: any) => {
            const regexp = new RegExp(this.avoid, 'g');
            const val = value.toString().replace(regexp, '');

            return val;
        },
        maxLength: (value: any) => {
            if (value.toString().length > this.maxLength) {
                return this.prevValue;
            }

            return value;
        },
        allowOnlyTwoDecimals: (value: any) => {
            const pattern = new RegExp(/^\d*(\.\d{0,2})?$/);
            if (!pattern.test(value)) {
                return this.prevValue;
            }
            return value;
        },
        avoidEmoji: (value: any) => {
            const pattern = new RegExp(emoji, 'g');

            if (value.search(pattern) === -1) {
                return value.toString();
            }

            const val = value.toString().replace(pattern, '');

            return val;
        }
    }

    @HostListener('input', ['$event.target.value']) onKeyup = (value: any) => {

        let val = value;
        let startPos, endPos;
        if (this._elementRef.nativeElement.type !== 'number') {
            startPos = this._elementRef.nativeElement.selectionStart;
            endPos = this._elementRef.nativeElement.selectionEnd;
        }

        Object.keys(this.helpers).forEach(key => {
            if (typeof this[key] !== 'undefined') {
                if (val === null) {
                    return;
                }

                val = this.helpers[key](val);
            }
        });

        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', val);
        this.onChange(val);
        if (this._elementRef.nativeElement.type !== 'number') {
            this._elementRef.nativeElement.selectionStart = startPos;
            this._elementRef.nativeElement.selectionEnd = startPos;
        }        
        this.prevValue = val;
    };

    @HostListener('blur', []) onTouched = () => { };

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

    ngOnInit() {
    }

    onChange = (_: any) => { };

    writeValue(value: any) {
        if (!value) {
            this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', null);
            this.prevValue = null;
            return;
        }

        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', value);
        this.prevValue = value;
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }

    setDisabledState(isDisabled: boolean): void {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
}