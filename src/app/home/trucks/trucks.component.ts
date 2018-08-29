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
} from '@angular/forms/src/model';
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

export class TrucksComponent implements OnInit {
  searchInput: '';
  loggedUser: any;
  searchForm: FormGroup;
  clearEmitter = new EventEmitter<any>();
  helperModel: any = {
    styles: trucksConstants,
    latitude: 0,
    longitude: 0,
    zoom: 4
  };
  trucks: any;
  selectedTruck: any = undefined;
  searchModel = {
    where: this.fb.group({
      label: [''],
      coordinates: this.fb.array([])
    }),
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
    this.userService.get()
      .subscribe((user: any) => {
        this.loggedUser = user;
        this.buildRequest();
      })

  }

  ngOnInit() {
    this.buildForm();
  }


  buildRequest() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.helperModel.latitude = params.lat;
      this.helperModel.longitude = params.lng;
      this.getNearCars();
    });
  }

  getNearCars() {
    this.carsService.getNearCars(this.helperModel.latitude, this.helperModel.longitude).subscribe((res) => {
      this.trucks = res.cars;
      console.log(this.trucks);
    })
  }

  clearInput(event: any) {
    this.clearEmitter.emit(true);
  }

  getAddress(event: any, formControl: any) {
    console.log(event);
    this.helperModel.longitude = event.geometry.location.lng();
    this.helperModel.latitude = event.geometry.location.lat();
    this.searchForm.get(formControl).get('label').setValue(`${event.formatted_address}`);
    this.searchForm.get(formControl).get('coordinates').setValue([event.geometry.location.lat, event.geometry.location.lng]);

  }

  buildForm() {
    this.searchForm = this.fb.group(this.searchModel);
  }

  searchTrucks() {
    console.log(this.trucks);
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

}
