import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';
import {} from 'googlemaps';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  FormControl
} from '@angular/forms/src/model';
import {
  MapsAPILoader
} from '@agm/core/services/maps-api-loader/maps-api-loader';


@Component({
  selector: 'evo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  addressOptions = {
    types: ['address'],
    componentRestrictions: {
      country: 'UA'
    }
  };
  searchInput: '';
  searchForm: FormGroup;
  helperModel: any = {
    styles: [{
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#e9e9e9"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f5f5"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "lightness": 17
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "lightness": 29
          },
          {
            "weight": 0.2
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "lightness": 18
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f5f5"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#dedede"
          },
          {
            "lightness": 21
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
            "saturation": 36
          },
          {
            "color": "#333333"
          },
          {
            "lightness": 40
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
            "color": "#f2f2f2"
          },
          {
            "lightness": 19
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#fefefe"
          },
          {
            "lightness": 20
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
            "color": "#fefefe"
          },
          {
            "lightness": 17
          },
          {
            "weight": 1.2
          }
        ]
      }
    ],
    minPrice: [{
        label: 'Мін.',
        value: null
      },
      {
        label: '100 грн.',
        value: 100
      },
      {
        label: '200 грн.',
        value: 200
      },
      {
        label: '300 грн.',
        value: 300
      },
      {
        label: '400 грн.',
        value: 400
      },
      {
        label: '500 грн.',
        value: 500
      },
      {
        label: '600 грн.',
        value: 600
      },
      {
        label: '700 грн.',
        value: 700
      },
    ],
    maxPrice: [{
        label: 'Макс.',
        value: null
      },
      {
        label: '100 грн.',
        value: 100
      },
      {
        label: '200 грн.',
        value: 200
      },
      {
        label: '300 грн.',
        value: 300
      },
      {
        label: '400 грн.',
        value: 400
      },
      {
        label: '500 грн.',
        value: 500
      },
      {
        label: '600 грн.',
        value: 600
      },
      {
        label: '700 грн.',
        value: 700
      },
    ],
    latitude: 0,
    longitude: 0,
    zoom: 4
  };

  searchModel = {
    where: this.fb.group({
      label: [''],
      lat: [''],
      lng: ['']
    }),
    minPrice: [''],
    maxPrice: ['']
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.buildForm();
    //set google maps defaults
    this.helperModel.zoom = 16;
    this.helperModel.latitude = 39.8282;
    this.helperModel.longitude = -98.5795;

    //set current position
    this.setCurrentPosition();

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.helperModel.latitude = position.coords.latitude;
        this.helperModel.longitude = position.coords.longitude;
        this.helperModel.zoom = 16;
      });
    }
  }
  clearInput(){
    this.searchInput = '';
  }
  getFormattedAddress(event: any, formcontrol: string, type:string) {
    if(type == 'city'){
      this.searchForm.get(formcontrol).get('label').setValue(`${event.city}, ${event.state}`);
    } else{
      this.searchForm.get(formcontrol).get('label').setValue(`${event.street} ${event.street_number}, ${event.city}, ${event.state}`);
    }
    this.searchForm.get(formcontrol).get('lat').setValue(event.lat);
    this.searchForm.get(formcontrol).get('lng').setValue(event.lng);
  }
  buildForm() {
    this.searchForm = this.fb.group(this.searchModel);

  }

}
