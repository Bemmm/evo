import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/core/services';

@Component({
    selector: 'evo-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() hasSearchLink: boolean = false;
    @Input() isLogged: boolean = false;
    @Input() headerStyle: any = '';
    @Output() toggleMobileNav = new EventEmitter();
    user: any;

    constructor(private userService: UserService, config: NgbDropdownConfig) {
        this.userService.get()
            .subscribe((user: any) => {
                this.user = user;
            })
            config.placement = 'bottom-right';
    }

    getLogoLink(): string {
        return this.isLogged ?
            (this.user.isConsumerCare() ? '/' : '/') :
            '/';
    }
}
