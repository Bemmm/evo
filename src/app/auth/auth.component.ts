import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'evo-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent {
    sliderOptions: any;
    sliderItems: any[];

    constructor() {

    }

}
