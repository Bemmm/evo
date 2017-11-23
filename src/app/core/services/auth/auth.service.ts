import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService, UserService } from 'app/core/services';

@Injectable()
export class AuthService {
    private loginUrl: string = 'loginUser';
    private registerUrl: string = 'registrations';
    private passwordResetStartUrl: string = 'passwordResetStart';
    private passwordResetUrl: string = 'passwordReset';
    private activateAccountUrl: string = 'activateAccount';

    constructor(
        private api: ApiService,
        private userService: UserService
    ) { }

    login(username: string, password: string): Observable<any> {
        return this.api.post(`${this.loginUrl}`, { username, password });
    }

    register(type: string, model:Object): Observable<any> {
        let body = {};
        body[type] = model;
        return this.api.post(`${type}/${this.registerUrl}`, body);
    }

    onAuth(res: any) {
        const userInfo = res.logedUser;
    }

    logout() {
        const prefix = GLOBAL_ENV && GLOBAL_ENV.BASE_HREF || '/evo-ecommerce-core/';
        const logoutLink = `${prefix}logout`;

        this.userService.remove();
        window.location.href = logoutLink;
    }

    passwordResetStart(email: string): Observable<any> {
        return this.api.post(this.passwordResetStartUrl, { email });
    }

    passwordReset(params: any): Observable<any> {
        return this.api.post(this.passwordResetUrl, params);
    }

    activateAccount(params: any): Observable<any> {
        return this.api.post(this.activateAccountUrl, params);
    }

    isLoggedIn(): Observable<any> {
       return this.api.get('/currentUser').map(user => user.id !== -1);
    }
}
