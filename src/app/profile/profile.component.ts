import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService, AuthService } from '../core/services';

@Component({
  selector: 'evo-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {
  loggedUser: any;
  constructor(private userService: UserService, private fb: FormBuilder, private authService: AuthService) {
    this.userService.get()
      .subscribe((user: any) => {
        this.loggedUser = user;
      })
  }
  getUserType() {
    switch (this.loggedUser.role) {
      case 'user':
        return 'Користувач';
      case 'driver':
        return 'Водій';
      case 'company':
        return 'Служба';

    }
  }
  ngOnInit() {

  }
  myUploader(event: any) {
    const data: any = {
      name: event.files[0].name,
      content_type: event.files[0].type,
      body: null
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.files[0]);
    reader.onload = () => {
      data.body = reader.result;
      this.authService.uploadAvatar(data, this.loggedUser['x-access-token']).subscribe((resp) => {
        this.loggedUser.avatar = resp.data;
        this.authService.updateUser(this.loggedUser, this.loggedUser._id, this.loggedUser['x-access-token']).subscribe((data)=>{
          console.log(data);
        })
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
