import { Component, OnInit } from '@angular/core';

import { AuthService } from 'app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'evo-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
