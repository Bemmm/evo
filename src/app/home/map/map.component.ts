import { } from 'googlemaps';
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
import { } from 'googlemaps';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  FormControl
} from '@angular/forms/src/model';
import {
  MapsAPILoader
} from '@agm/core/services/maps-api-loader/maps-api-loader';
import { CarsService } from 'app/core/services';
import { mapConstants } from 'app/home/map/map.constants'

@Component({
  selector: 'evo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  searchInput: '';
  searchForm: FormGroup;
  helperModel: any = {
    styles: mapConstants,
    label: '',
    latitude: 0,
    longitude: 0,
    zoom: 4
  };
  trucks: any = [{
    "registration_number": "АН255356",
    "company_id": "5aabc25a3223340004b65a62",
    "company_user_id": "",
    "_id": "",
    "car_attributes": {
      "category": "4",
      "brand": {
        "name": "TATA",
        "value": 78
      }, "model": {
        "name": "LPT",
        "value": 2239
      }
    },
    "address": {
      "label": "Ющенка 5",
      "lat": 49.2202179,
      "lng": 28.4429107
    },
    "user": {
      "phone": '+380989422971',
      "name": 'Oleh'
    },
    "passengers_count": "12",
    "weight_limit": "600",
    "car_types": [
      {
        "name": "Легковые",
        "value": 1
      },
      {
        "name": "Мото",
        "value": 2
      },
      {
        "name": "Водный транспорт",
        "value": 3
      }
    ],
    "type": "wrecker",
    "photo": "1",
    "price": "24",
    "description": "фівфівфівфів"
  }, {
    "registration_number": "АН255356",
    "company_id": "5aabc25a3223340004b65a62",
    "company_user_id": "",
    "_id": "",
    "user": {
      "phone": '+380989422971',
      "name": 'Maxim'
    },
    "car_attributes": {
      "category": "4",
      "brand": {
        "name": "TATA",
        "value": 78
      }, "model": {
        "name": "LPT",
        "value": 2239
      }
    },
    "address": {
      "label": "Скайпарк",
      "lat": 49.2333661,
      "lng": 28.4699592
    },
    "passengers_count": "12",
    "weight_limit": "600",
    "car_types": [
      {
        "name": "Легковые",
        "value": 1
      },
      {
        "name": "Мото",
        "value": 2
      },
      {
        "name": "Водный транспорт",
        "value": 3
      }
    ],
    "type": "wrecker",
    "photo": "1",
    "price": "24",
    "description": "фівфівфівфів"
  }];
  selectedTruck: any = undefined;
  searchModel = {
    where: this.fb.group({
      label: [''],
      lat: [''],
      lng: ['']
    }),
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private carsService: CarsService
  ) {
  }

  ngOnInit() {
    this.buildForm();
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
  clearInput() {
    this.searchInput = '';
  }
  getAddress(event: any, formControl: any) {
    this.helperModel.longitude = event.geometry.location.lng();
    this.helperModel.latitude = event.geometry.location.lat();
    this.searchForm.get(formControl).get('label').setValue(`${event.formatted_address}`);
    this.searchForm.get(formControl).get('lat').setValue(event.geometry.location.lat);
    this.searchForm.get(formControl).get('lng').setValue(event.geometry.location.lng);
  }
  buildForm() {
    this.searchForm = this.fb.group(this.searchModel);

  }
  searchTrucks() {
    console.log(this.trucks);
  }
  convertToNumber(value: String) {
    return +value;
  }
  showTruckInfo(truck: Object) {
    this.selectedTruck = truck;
    console.log(truck);
  }
  closeTruckInfo() {
    this.selectedTruck = undefined;
  }
  repeatCarTypes(carTypes: any) {
    return carTypes.map((item: any) => {
      return item.name;
    }).join(', ');
  }
}
