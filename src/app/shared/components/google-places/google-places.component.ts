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
  @Input() type: string;
  @Input() label: Object;
  // @Input() defaultAddress: any;
  @Input() set defaultAddress(value: any) {
    this._defaultAddress = value;
    if (value.latitude && value.longitude) {
      this.setCurrentAddress(this.addressElementRef);
    }
  }
  get defaultAddress(): any {
    return this._defaultAddress;

  };
  @Input() clear: any;
  @Input() placeholder: any;

  @Output() locationData = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();
  autocomplete: any;
  focused: any;

  @ViewChild("address")
  public addressElementRef: ElementRef;


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
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.addressElementRef.nativeElement, {
        types: [this.type]
      });
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
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(this.defaultAddress.latitude, this.defaultAddress.longitude);
    geocoder.geocode({
      'location': latlng
    }, function (results: any, status: any) {
      if (status === google.maps.GeocoderStatus.OK) {
        element.nativeElement.value = results[0].formatted_address;
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

}

