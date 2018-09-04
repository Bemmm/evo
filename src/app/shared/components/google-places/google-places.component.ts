import { Component, NgZone, Input, Output, EventEmitter, ElementRef, ViewEncapsulation, ViewChild, OnInit, OnDestroy, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
  selector: 'google-places',
  templateUrl: 'google-places.component.html',
  styleUrls: ['google-places.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class GooglePlacesComponent implements OnInit, AfterContentInit {
  private _defaultAddress: string;
  private _type: string;
  private _placeholder: string;
  @ViewChild("address")
  public addressElementRef: ElementRef = null;
  @Input() label: Object;
  @Input() clear: any;

  @Input() set type(value: any) {
  console.log('BEM _type :: value', value);
    this._type = value;
    if (this.autocomplete) {
      this.autocomplete.setTypes([value]);
      console.log('BEM autocomplete :: this.autocomplete', this.autocomplete);
    }
  }
  get type(): any {
    return this._type;
  };
  @Input() set placeholder(value: any) {
    this._placeholder = value;
  }
  get placeholder(): any {
    return this._placeholder;
  };
  @Input() set defaultAddress(value: any) {
    this._defaultAddress = value;
    if (value.latitude && value.longitude) {
      this.setCurrentAddress(this.addressElementRef, this.autocomplete);
    }
  }
  get defaultAddress(): any {
    return this._defaultAddress;

  };

  @Output() locationData = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();
  autocomplete: any;
  focused: any;

  constructor(private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader) {

  };

  ngAfterContentInit() {
    this.listenChanges();
  }
  ngOnInit() {
    if (this.clear) {
      this.clear.subscribe((res: any) => {
        this.clearInput();
      });
    }
  }
  focusFunction() {
    this.focused = !this.focused;
    this.focus.emit(this.focused);
  }

  clearInput() {
    this.addressElementRef.nativeElement.value = '';
  }

  listenChanges() {
    let element = document.getElementsByClassName('pac-container')[0];
    if (element) element.remove();
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.addressElementRef.nativeElement, {
        types: [this._type],
        componentRestrictions: { country: "ua" }
      });
      console.log('BEM desc :: this.autocomplete', this.autocomplete);
      console.log(this.addressElementRef, this.defaultAddress);
      if (this.defaultAddress && this.defaultAddress.label.value) {
        this.addressElementRef.nativeElement.value = this.defaultAddress.label.value;
      } else if (this.defaultAddress) {
        this.setCurrentAddress(this.addressElementRef, this.autocomplete);
      };

      this.autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          };

          this.locationData.emit(place);
        });
      })
    })
  }

  setCurrentAddress(element: any, autocomplete?: any) {
    let geocoder = null;
    let latlng = null
    setTimeout(() => {
      geocoder = new google.maps.Geocoder();
      latlng = new google.maps.LatLng(this.defaultAddress.latitude, this.defaultAddress.longitude);
      geocoder.geocode({
        'location': latlng
      }, function (results: any, status: any) {
        if (status === google.maps.GeocoderStatus.OK && element) {
          autocomplete.set('place', results[0]);
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
    }, 100);
  }

}

