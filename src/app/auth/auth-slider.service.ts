import { Injectable } from '@angular/core';

@Injectable()
export class AuthSliderService {
    private options = {
        slidesPerView: 1,
        loop: true,
        autoplay: 5000,
        simulateTouch: true,
        autoplayDisableOnInteraction: false,
        centeredSlides: true,
        autoHeight: true
    }
    private items = [
        { url: require('!url-loader!./assets/img/for-slider/Rose.jpg') },
        { url: require('!url-loader!./assets/img/for-slider/CottonCandyBlue.jpg') },      
        { url: require('!url-loader!./assets/img/for-slider/Hearts.jpg') },
        { url: require('!url-loader!./assets/img/for-slider/Petals.jpg') },
        { url: require('!url-loader!./assets/img/for-slider/BlueBoards.jpg') },
        { url: require('!url-loader!./assets/img/for-slider/AmericanFlag.jpg') },
        { url: require('!url-loader!./assets/img/for-slider/WhiteBrick.jpg') },
        { url: require('!url-loader!./assets/img/for-slider/Storm.jpg') }
    ];

    getOptions(): any {
        return this.options;
    }

    getItems(): any[] {
        return this.items;
    }
}
