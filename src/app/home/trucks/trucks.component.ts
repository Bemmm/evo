import {} from 'googlemaps';
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
  NgZone,
  EventEmitter
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRoute
} from '@angular/router';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  FormControl
} from '@angular/forms';
import {
  MapsAPILoader
} from '@agm/core/services/maps-api-loader/maps-api-loader';
import { CarsService, UserService } from '../../core/services';
import { trucksConstants } from 'app/home/trucks/trucks.constants';

@Component({
  selector: 'evo-trucks',
  templateUrl: './trucks.component.html',
  styleUrls: ['./trucks.component.scss']
})

export class TrucksComponent implements OnInit, OnDestroy {
  loggedUser: any;
  selectedType: string = 'list'
  searchForm: FormGroup;
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
    { label: 'Не обрано', value: null },
    { label: 'Спочатку найближчі', value: 'nearest' }
  ]
  helperModel: any = {
    // styles: trucksConstants,
    where: {
      latitude: null,
      longitude: null
    }
  };
  trucks: any;
  selectedTruck: any = undefined;
  searchModel = {
    where: this.fb.group({
      label:[''],
      latitude: [''],
      longitude: ['']
    }),
    weight_limit: [''],
    price: this.fb.array([
      20,
      60
    ]),
    sort: ['']
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
      // this.helperModel.where.label = params.label;
      this.searchForm.patchValue(this.helperModel);
      // this.getNearCars();
    });
  }

  getNearCars() {
    this.carsService.getNearCars(this.helperModel.latitude, this.helperModel.longitude).subscribe((res) => {
      this.trucks = res.cars;
      console.log(this.trucks);
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
    console.log('BEM desc :: event', event);
    this.searchForm.get(formControl).get('label').setValue(`${event.formatted_address}`);
    this.searchForm.get(formControl).get('latitude').setValue(event.geometry.location.lat());
    this.searchForm.get(formControl).get('longitude').setValue(event.geometry.location.lng());
  }
}
