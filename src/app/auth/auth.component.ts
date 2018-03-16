import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'evo-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent {
  sliderOptions: any;
  sliderItems: any[];
  title = 'test'

  constructor(private route: ActivatedRoute,
    private router: Router) {

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        route.children[0].data.subscribe((data) => {
          this.title = data.title;
        })
      };
    });
  }
}
