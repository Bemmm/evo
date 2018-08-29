import { Component } from '@angular/core';
import { FormBuilder, FormControl} from '@angular/forms';
import { UserService, DriversService } from '../../core/services';
import { Validators } from '@angular/forms';
import { UA } from '../../shared/constants/calendar-local';
import {
  MapsAPILoader
} from '@agm/core/services/maps-api-loader/maps-api-loader';
import {
  Address
} from 'angular-google-place';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
    selector: 'evo-profile-drivers',
    templateUrl: 'profile-drivers.component.html',
    styleUrls: ['profile-drivers.component.scss']
})
export class ProfileDriversComponent implements OnDestroy{
  addressOptions = {
    type: 'address',
    componentRestrictions: {
      country: 'UA'
    }
  };
  ua:any = UA;
  driverDialog: boolean = false;
  driverForm: any = null;
  loggedUser: any = null;
  drivers: object[] = [];
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private driversService: DriversService,
    private mapsAPILoader: MapsAPILoader) {
    this.userService.get()
      .subscribe((user: any) => {
        this.loggedUser = user;
        this.buildDriverForm()
      });

    this.getDrivers();
  }

  getDrivers() {
    this.driversService.getDrivers(this.loggedUser._id, this.loggedUser['x-access-token']).subscribe((res) => {
      this.drivers = res.users;
    });
  };

  ngOnDestroy(){
    let element = document.getElementsByClassName('pac-container')[0];
    if (element) element.remove();
    console.log(element);
  }

  buildDriverForm() {
    let driverModel = {
      company_id:[this.loggedUser._id],
      name:[''],
      email: ['', [Validators.required]],
      passport: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      role: ['driver'],
      address: this.fb.group({
        label: ['', [Validators.required]],
        type: 'Point',
        coordinates: this.fb.array([
          new FormControl(),
          new FormControl()
        ])
      }),
    }
    this.driverForm = this.fb.group(driverModel);
    // this.driverForm.patchValue(this.loggedUser)
  }
  addDriver() {
    this.driverForm.editMode = false;
    this.driverForm.get('company_id').setValue(this.loggedUser._id);
    this.driverForm.get('role').setValue('driver');
    this.driverDialog = !this.driverDialog;
  }
  submitCreation(mode: string) {
    console.log(this.driverForm)
    if (mode == 'editMode') {
      this.driversService.editDriver(this.driverForm.value, this.loggedUser['x-access-token']).subscribe((res) => {
        this.drivers.push(this.driverForm.value);
        this.driverForm.reset();
        this.driverDialog = !this.driverDialog;
      })
    } else {
      this.driversService.addDriver(this.driverForm.value, this.loggedUser['x-access-token']).subscribe((res) => {
        this.drivers.push(res);
        this.driverForm.reset();
        this.driverDialog = !this.driverDialog;
      })
    }
  }
  getAddress(event: any, formcontrol: string) {
    this.driverForm.get(formcontrol).get('label').setValue(`${event.formatted_address}`);
    this.driverForm.get(formcontrol).get('coordinates').setValue([event.geometry.location.lat(), event.geometry.location.lng()]);

  }
  deleteDriver(driver: any) {
    this.driversService.deleteDriver(driver._id, this.loggedUser['x-access-token']).subscribe((res:any) => {
      let index = this.drivers.indexOf(driver);
      if (index !== -1) {
        this.drivers.splice(index, 1);
      }
    })
  }
  editDriver(driver: any) {
    console.log(driver);
    this.driverForm.editMode = true;
    this.driverForm.patchValue(driver);
    this.driverDialog = !this.driverDialog;
  }

  clearForm() {
    this.driverForm.editMode = null;
    this.driverForm.reset();
    this.driverForm.get('role').setValue('driver');
  }

}
