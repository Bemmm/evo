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
    subscriptions: Subscription[] = [];
    title: string;
    description: string;
    hasSearchLink: boolean;
    isLogged: boolean = false;
    showMobileNav: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService
    ) {
        this.subscribeRouter();
        this.subscribeUserService();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    subscribeRouter() {
        const routerSubscription = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .subscribe(route => {
                this.hasSearchLink = route.snapshot.children[0].data['hasSearchLink'];
            });

        this.subscriptions.push(routerSubscription);
    }

    subscribeUserService() {
        this.userService.get()
            .map(user => user.isLoggedIn())
            .subscribe(isLogged => this.isLogged = isLogged);
    }

    onToggleMobileNav() {
        this.showMobileNav = !this.showMobileNav;
    }

    hideMobileNav() {
        this.showMobileNav = false;
    }
}