import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UserService } from 'app/core/services';

@Component({
    selector: 'evo-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() hasSearchLink: boolean = false;
    @Input() isLogged: boolean = false;
    @Output() toggleMobileNav = new EventEmitter();
    user: any;

    constructor(private userService: UserService) {
        this.userService.get()
            .subscribe((user: any) => {
                this.user = user;
            })
    }

    getLogoLink(): string {
        return this.isLogged ?
            (this.user.isConsumerCare() ? '/consumer-care' : '/preview') :
            '/login';
    }
}