import { Component, NgZone, Input, Output, EventEmitter, ElementRef, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
  selector: 'google-places',
  templateUrl: 'google-places.component.html',
  styleUrls: ['google-places.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GooglePlacesComponent {
  @Input() type: string;
  @Input() label: Object;
  @Input() defaultAddress: any;
  @Output() locationData = new EventEmitter<any>();
  @Output() focus = new EventEmitter<any>();
  @ViewChild("address")
  public addressElementRef: ElementRef;
  autocomplete: any;
  focused: any;

  constructor(private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader) {
    this.listenChanges();
  };

  focusFunction() {
    this.focused = !this.focused;
    this.focus.emit(this.focused);
  }

  listenChanges() {
    this.mapsAPILoader.load().then(() => {
      if (this.defaultAddress) {
        this.setCurrentAddress();
      };
      this.autocomplete = new google.maps.places.Autocomplete(this.addressElementRef.nativeElement, {
        types: [this.type]
      });
      this.autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.locationData.emit(place);
          // street: place.geometry.location,
          // street_number: place.geometry.street_number,
          // city: place.geometry.city,
          // state: place.geometry.state
        });
      })
    })
  }

  setCurrentAddress() {
    let geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(this.defaultAddress.latitude, this.defaultAddress.longitude);
    geocoder.geocode({
      'location': latlng
    }, function (results: any, status: any) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          console.log(results[1]);
          console.log(this.addressElementRef);

          // this.addressElementRef.nativeElement.value = results[1].formatted_address;
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  }

}

