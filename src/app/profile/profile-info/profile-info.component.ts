import { Component, Input } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ValidationService, UserService, AuthService } from 'app/core/services';

@Component({
    selector: 'evo-profile-info',
    templateUrl: 'profile-info.component.html',
    styleUrls: ['profile-info.component.scss']
})
export class ProfileInfoComponent {
    transportDialog: boolean = false; 
    loggedUser: any = null;
    userInfoForm: any = null;
    transportCategories: any = null;
    brand:any = null;
    orders = [
        {
            id: 12123,
            date: 123123123,
            driver:{
                _id: 123123,
                name: 'uasa',
                avatar:'/test'
            },
            from: {label:'Гнівань'},
            number: 'AF12344',
            status: 'success',
            mark: 5
        },
        {
            id: 12123,
            date: 123123123,
            driver:{
                _id: 123123,
                name: 'uasa',
                avatar:'/test'
            },
            from: {label:'Гнівань'},
            number: 'AF12344',
            status: 'success',
            mark: 5
        }        
    ]    
    constructor(private fb: FormBuilder, private userService: UserService, private auth: AuthService){
        this.userService.get()
        .subscribe((user: any) => {
            this.loggedUser = user;
            this.buildUserForm()
        })
    }
        buildUserForm(){
        this.getCategories();
        let userModel = {
            name: ['', [Validators.required]],
            phone: [this.loggedUser.phone, [Validators.required]],
            email: [this.loggedUser.email, [ValidationService.emailValidator]],
            address: this.fb.group({
              label: [this.loggedUser.address.label, [Validators.required]],
              lat: [this.loggedUser.address.lat],
              lng: [this.loggedUser.address.lng],
            }),
            car_attributes: this.fb.group({
              brand: [this.loggedUser.car_attributes.brand],
              model: [this.loggedUser.car_attributes.model],
              category: [this.loggedUser.car_attributes.category]
            })
          };
          this.userInfoForm = this.fb.group(userModel);

    }
    getCategories() {
       this.auth.getCategories().subscribe(
          res => {
            this.transportCategories = res;
            console.log(res);
          },
          errorRes => {
            console.log(errorRes);
          });
      }
      categoryChange(event: any) {
        this.auth.getMarks(this.userInfoForm.get('car_attributes').get('category').value).subscribe(
          res => {
            this.brand = res;
            this.transportDialog = !this.transportDialog;
            
          },
          errorRes => {
            console.log(errorRes);
          });
      }
      showTransportDialog(){
        this.transportDialog = !this.transportDialog;
          
      }
}
