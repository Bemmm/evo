import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';
 
@Directive({
    selector: '[jpixClickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef : ElementRef) {
    }
 
    @Output()
    public clickOutside = new EventEmitter();
 
    @HostListener('document:click', ['$event'])
    public onClick(event:any) {
        const clickedInside = this._elementRef.nativeElement.contains(event.target);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    }
}