import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from 'app/core/services';


@Component({
    selector: 'evo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
    isLogged: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService
    ) {
        this.subscribeUserService();
    }

    ngOnDestroy() {
    }

    subscribeUserService() {
        // this.userService.get()
        //     .map(user => user.isLoggedIn())
        //     .subscribe(isLogged => this.isLogged = isLogged);
    }

}