import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService, DriversService } from 'app/core/services';
import { MapsAPILoader } from '@agm/core/services/maps-api-loader/maps-api-loader';
import { Validators } from '@angular/forms';
import { UA } from 'app/shared/constants/calendar-local';

@Component({
    selector: 'evo-profile-drivers',
    templateUrl: 'profile-drivers.component.html',
    styleUrls: ['profile-drivers.component.scss']
})
export class ProfileDriversComponent {
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
        lat: [''],
        lng: [''],
      }),
    }
    this.driverForm = this.fb.group(driverModel);
    // this.driverForm.patchValue(this.loggedUser)
  }
  addDriver() {
    this.driverForm.editMode = false;
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
        this.drivers.push(res.car);
        this.driverForm.reset();
        this.driverDialog = !this.driverDialog;
      })
    }
  }
  getFormattedAddress(event: any, formcontrol: string) {
    this.driverForm.get(formcontrol).get('label').setValue(`${event.street} ${event.street_number}, ${event.city}, ${event.state}`);
    this.driverForm.get(formcontrol).get('lat').setValue(event.lat);
    this.driverForm.get(formcontrol).get('lng').setValue(event.lng);
  }

}
