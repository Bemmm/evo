import { Component, Input } from '@angular/core';

@Component({
    selector: 'evo-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent { 
     @Input() hideOrdersLink:boolean = false;
     @Input() isLogged:boolean = false;

     constructor() { }

}