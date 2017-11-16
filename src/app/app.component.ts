import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'evo-app',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss',
        './../../node_modules/swiper/dist/css/swiper.css',
        './../../node_modules/ng2-toastr/bundles/ng2-toastr.min.css'
    ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(private toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }
}