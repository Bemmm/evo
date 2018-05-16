import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserService, AuthService } from 'app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'evo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() hasSearchLink: boolean = false;
  @Input() isLogged: boolean = false;
  @Input() headerStyle: any = '';
  @Input() title: any = '';
  @Output() toggleMobileNav = new EventEmitter();
  user: any;

  constructor(private userService: UserService, private authService: AuthService, private router:Router, config: NgbDropdownConfig) {
    this.userService.get()
      .subscribe((user: any) => {
        this.user = user;
      })
    config.placement = 'bottom-right';
    console.log(this.title);
  }

  getLogoLink(): string {
    return this.isLogged ?
      (this.user.isConsumerCare() ? '/' : '/') :
      '/';
  }
  logout() {
    this.router.navigate(['/']);
    this.authService.logout();
  }
}
