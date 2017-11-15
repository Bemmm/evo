import { Component, Input, Output, EventEmitter } from '@angular/core';

import { AuthService } from 'app/core/services';

@Component({
    selector: 'jpix-mobile-nav',
    templateUrl: './mobile-nav.component.html',
    styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent {
    @Input() hasSearchLink: boolean = false;
    @Input() isLogged: boolean = false;
    @Output() hideMobileNav = new EventEmitter();

    constructor(private authService: AuthService) { }

    onLogoutClick() {
        this.authService.logout();
    }
}