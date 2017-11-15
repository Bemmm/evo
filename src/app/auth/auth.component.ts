import { Component, ViewEncapsulation } from '@angular/core';

import { AuthSliderService } from './auth-slider.service';

@Component({
    selector: 'jpix-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [AuthSliderService]
})
export class AuthComponent {
    sliderOptions: any;
    sliderItems: any[];

    constructor(private authSliderService: AuthSliderService) {
        this.sliderOptions = this.authSliderService.getOptions();
        this.sliderItems = this.authSliderService.getItems();
    }

}
