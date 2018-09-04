import {
  FormGroup, FormBuilder
} from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { CarsService, UserService } from '../../core/services';
import { trucksConstants } from 'app/home/trucks/trucks.constants';
import { Address } from 'angular-google-place';
@Component({
  selector: 'evo-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.scss']
})

export class TrucksComponent implements OnInit {
  loggedUser: any;
  selectedType: string = 'list'
  searchForm: FormGroup;
  loading: boolean = true;
  mapSettings: any = {
    latitude: 0,
    longitude: 0,
    styles: trucksConstants
  };
  types: any = [
    { label: 'Список', value: 'list', icon: 'fa fa-fw fa-list-ul' },
    { label: 'Карта', value: 'map', icon: 'fa fa-fw fa-map-marker' }
  ];
  weightTypes: any = [
    { label: 'Не обрано', value: null },
    { label: 'до 100', value: 100 },
    { label: 'до 500', value: 500 },
    { label: 'до 800', value: 800 },
    { label: 'до 1000', value: 1000 }
  ]
  sortTypes: any = [
    { label: 'Спочатку найближчі', value: 'nearest' }
  ]
  helperModel: any = {
    where: {
      latitude: null,
      longitude: null
    }
  };
  trucks: any;
  selectedTruck: any = undefined;
  searchModel = {
    where: this.fb.group({
      label: [''],
      latitude: [''],
      longitude: ['']
    }),
    weight_limit: [''],
    price: [[
      20,
      60
    ]],
    sort: ['nearest']
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private carsService: CarsService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.searchForm = this.fb.group(this.searchModel);
    this.getCurrentPosition();
    this.userService.get()
      .subscribe((user: any) => {
        this.loggedUser = user;
        this.buildRequest();
      })

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    let element = document.getElementsByClassName('pac-container')[0];
    if (element) element.remove();
    console.log(element);
  }
  buildRequest() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.helperModel.where.latitude = params.lat;
      this.helperModel.where.longitude = params.lng;
      this.helperModel.where.label = params.label;
      this.buildForm();
      this.getNearCars();
    });
  }
  buildForm() {
    this.searchForm.patchValue(this.helperModel);
    this.searchForm.valueChanges.debounceTime(1000).subscribe(val => {
      this.getNearCars();
    });
  }
  getNearCars() {
    this.loading = true;
    this.carsService.getNearCars(this.searchForm.value).subscribe((res) => {
      this.trucks = res.cars;
      this.loading = false;
    })
  }


  showTruckInfo(truck: any) {
    this.carsService.getTruckInfo(truck._id).subscribe((res) => {
      this.selectedTruck = res.car;
    });
  }

  closeTruckInfo() {
    this.selectedTruck = undefined;
  }

  repeatCarTypes(carTypes: any) {
    return carTypes.map((item: any) => {
      return item.name;
    }).join(', ');
  }
  getAddress(event: any, formControl: any) {
    this.searchForm.get(formControl).get('label').setValue(`${event.formatted_address}`);
    this.searchForm.get(formControl).get('latitude').setValue(event.geometry.location.lat());
    this.searchForm.get(formControl).get('longitude').setValue(event.geometry.location.lng());
  }
  getShortAddress(address: string) {
    let arr = address.split(',');
    return arr.splice(0,3).join(',');
  }
  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.mapSettings.latitude = position.coords.latitude;
      this.mapSettings.longitude = position.coords.longitude;
    }, (err) => {
      console.log(err);
    }, { enableHighAccuracy: true });
  }
}
