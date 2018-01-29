import { Component } from '@angular/core';

@Component({
    selector: 'evo-profile-trucks',
    templateUrl: 'profile-trucks.component.html',
    styleUrls: ['profile-trucks.component.scss']
})
export class ProfileTrucksComponent {
    trucks = [
        {
            photo: '',
            number: '321',
            car_attributes: {
                brand: '',
                model: '',
                max_size: '',
                car_types: ''
            },
            address: {
                label: '',
                lat: '',
                lng: '',
    
            }
        },
        {
            photo: '',
            number: '123',
            car_attributes: {
                brand: '',
                model: '',
                max_size: '',
                car_types: ''
            },
            address: {
                label: '',
                lat: '',
                lng: '',
    
            }
        }        
    ]
}
