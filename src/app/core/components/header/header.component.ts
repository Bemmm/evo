import { Component, Input, Output, EventEmitter } from '@angular/core';

import { User } from 'app/shared/models';
import { UserService } from 'app/core/services';

@Component({
    selector: 'jpix-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() hasSearchLink: boolean = false;
    @Input() isLogged: boolean = false;
    @Output() toggleMobileNav = new EventEmitter();
    user: User;

    constructor(private userService: UserService) {
        this.userService.get()
            .subscribe((user: User) => {
                this.user = user;
            })
    }

    getLogoLink(): string {
        return this.isLogged ?
            (this.user.isConsumerCare() ? '/consumer-care' : '/preview') :
            '/login';
    }
}