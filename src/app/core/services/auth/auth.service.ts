import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';

import {
  ApiService,
  UserService
} from 'app/core/services';

@Injectable()
export class AuthService {
  private loginUrl: string = 'user/login';
  private registerUrl: string = 'user/registration';
  private user: string = 'user';
  private registerUserAdditionalsUrl: string = 'users/additionals';
  private passwordResetStartUrl: string = 'passwordResetStart';
  private passwordResetUrl: string = 'passwordReset';

  constructor(
    private api: ApiService,
    private userService: UserService
  ) {}

  login(phone: string, password: string): Observable < any > {
    return this.api.post(`${this.loginUrl}`, {
        phone: ''+phone,
        password: password
    });
  }

  register(model: any): Observable < any > {
    return this.api.post(`${this.registerUrl}`, model);
  }

  registerAdditionals(model: any, id: string, token?:string): Observable < any > {
    let body: any = model;
    return this.api.put(`${this.user+'/'+id}`, body, token);
  }

  updateUser(model: any, id: string, token?:string): Observable < any > {
    let body: any = model;
    return this.api.put(`${this.user+'/'+id}`, body, token);
  }
  onAuth(user: any) {
    this.userService.save(user);
  }

  logout() {
    const prefix = GLOBAL_ENV && GLOBAL_ENV.BASE_HREF || '/api/';
    const logoutLink = `${prefix}logout`;

    this.userService.remove();
    window.location.href = logoutLink;
  }

  passwordResetStart(email: string): Observable < any > {
    return this.api.post(this.passwordResetStartUrl, {
      email
    });
  }

  passwordReset(params: any): Observable < any > {
    return this.api.post(this.passwordResetUrl, params);
  }


  isLoggedIn(): Observable < any > {
    return this.api.get('/currentUser').map(user => user.id !== -1);
  }
}
