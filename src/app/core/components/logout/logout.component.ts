import { Component } from '@angular/core';

import { AuthService } from 'app/core/services';

@Component({
    selector: 'evo-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

    constructor(private authService: AuthService) { }

    onLogoutClick() {
        this.authService.logout();
    }

}
