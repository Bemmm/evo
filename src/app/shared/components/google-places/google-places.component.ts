import { Component, NgZone, Input, Output, EventEmitter, ElementRef, ViewEncapsulation, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'google-places',
  templateUrl: 'google-places.component.html',
  styleUrls: ['google-places.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class GooglePlacesComponent implements OnInit,  OnDestroy {
  @Input() type: string;
  @Input() label: Object;
  @Input() defaultAddress: any;
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
    this.listenChanges();
  };


  ngOnInit() {
    if (this.clear) {
      this.clear.subscribe((res: any) => {
        this.clearInput();
      });
    }
  }

  ngOnDestroy(){

  }

  focusFunction() {
    this.focused = !this.focused;
    this.focus.emit(this.focused);
  }

  clearInput() {
    this.addressElementRef.nativeElement.value = '';
  }

  listenChanges() {
    console.log('LISTENCHANGES', this.addressElementRef);
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.addressElementRef.nativeElement, {
        types: [this.type]
      });
      if (this.defaultAddress && this.defaultAddress.label.value) {
        this.addressElementRef.nativeElement.value = this.defaultAddress.label.value;
      } else if( this.defaultAddress){
        this.setCurrentAddress(this.addressElementRef);
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

  setCurrentAddress(element: any) {
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(this.defaultAddress.latitude, this.defaultAddress.longitude);
    geocoder.geocode({
      'location': latlng
    }, function (results: any, status: any) {
      console.log('PLACE BY COORDS', results[0]);
      if (status === google.maps.GeocoderStatus.OK) {
        element.nativeElement.value = results[0].formatted_address;
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

}

