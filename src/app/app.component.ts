import {
  Component,
  ViewEncapsulation,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'evo-app',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss',
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(vcr: ViewContainerRef) {
  }
}
