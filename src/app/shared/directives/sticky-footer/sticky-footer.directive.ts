import { Directive, Input, ViewChild, ViewContainerRef, ElementRef, OnInit, AfterViewChecked, HostListener } from '@angular/core';
import { FooterComponent } from 'app/core/components';
import { Subject } from 'rxjs/Subject';

@Directive({
    selector: '[jpixStickyFooter]'
})
export class StickyFooterDirective implements AfterViewChecked {
    @HostListener('window:resize') onWindowResize() {
        this.toggleFooter$.next();
    }

    toggleFooter$ = new Subject();

    constructor(private el: ElementRef) {
        this.toggleFooter$.debounceTime(100).subscribe(() => {
            this.toggleFooterPostion();
        });
    }

    ngAfterViewChecked() {
        this.toggleFooterPostion();
    }

    toggleFooterPostion() {
        const hasClass = this.el.nativeElement.classList.contains('jpix-fixed--to-bottom');
        const needToFix = ((document.body.offsetHeight + this.el.nativeElement.offsetHeight) < window.innerHeight) && hasClass ||
            (document.body.offsetHeight < window.innerHeight) && !hasClass;

        if (needToFix) {
            this.el.nativeElement.classList.add('jpix-fixed--to-bottom');
        } else {
            this.el.nativeElement.classList.remove('jpix-fixed--to-bottom');
        }
    }

}