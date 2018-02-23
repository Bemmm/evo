import { Component } from '@angular/core';

import { AuthService } from 'app/core/services';
import { Router } from '@angular/router';

@Component({
    selector: 'evo-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

    constructor(private authService: AuthService,
                private router: Router) { }

    onLogoutClick() {
        this.router.navigate(['/']);
        this.authService.logout();
    }

}
