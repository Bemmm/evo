import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService, AuthService } from 'app/core/services';

@Component({
    selector: 'evo-profile-orders',
    templateUrl: 'profile-orders.component.html',
    styleUrls: ['profile-orders.component.scss']
})
export class ProfileOrdersComponent {
    loggedUser: null;
    orders = [
        {
            id: 12123,
            date: 123123123,
            driver: {
                _id: 123123,
                name: 'uasa',
                avatar: '/test'
            },
            from: { label: 'Гнівань' },
            number: 'AF12344',
            status: 'success',
            mark: 5
        },
        {
            id: 12123,
            date: 123123123,
            driver: {
                _id: 123123,
                name: 'uasa',
                avatar: '/test'
            },
            from: { label: 'Гнівань' },
            number: 'AF12344',
            status: 'success',
            mark: 5
        }
    ];
    constructor(private fb: FormBuilder, private userService: UserService, private auth: AuthService) {
        this.userService.get()
            .subscribe((user: any) => {
                this.loggedUser = user;
            })
    }
}
