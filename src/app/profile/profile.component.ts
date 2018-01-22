import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService, ValidationService } from 'app/core/services';

@Component({
    selector: 'evo-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {
    loggedUser:any;
    constructor(private userService: UserService, private fb: FormBuilder){
        this.userService.get()
            .subscribe((user: any) => {
                this.loggedUser = user;
            })
    }
    
    ngOnInit(){

    }
}
