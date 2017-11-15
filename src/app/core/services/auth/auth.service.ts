import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User, UserLoginResponse, UserActivateParams } from 'app/shared/models';
import { ApiService, UserService, SelectedPhotosService, PreviewParamsService } from 'app/core/services';

@Injectable()
export class AuthService {
    private loginUrl: string = 'loginUser';
    private registerUrl: string = 'createAccount';
    private passwordResetStartUrl: string = 'passwordResetStart';
    private passwordResetUrl: string = 'passwordReset';
    private activateAccountUrl: string = 'activateAccount';

    constructor(
        private api: ApiService,
        private userService: UserService,
        private selectedPhotosService: SelectedPhotosService,
        private previewParamsService: PreviewParamsService
    ) { }

    login(username: string, password: string): Observable<any> {
        return this.api.post(`${this.loginUrl}`, { username, password });
    }

    register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
        return this.api.post(`${this.registerUrl}`, { firstName, lastName, email, password });
    }

    onAuth(res: UserLoginResponse) {
        const userInfo = res.logedUser;
        const user = new User(
            userInfo.firstname,
            userInfo.lastname,
            userInfo.username,
            userInfo.roles,
            true
        );
        this.userService.save(user);
        this.selectedPhotosService.clear();
        this.previewParamsService.clear();
    }

    logout() {
        const prefix = GLOBAL_ENV && GLOBAL_ENV.BASE_HREF || '/jpix-ecommerce-core/';
        const logoutLink = `${prefix}logout`;

        this.userService.remove();
        this.selectedPhotosService.clear();
        this.previewParamsService.clear();
        window.location.href = logoutLink;
    }

    passwordResetStart(email: string): Observable<any> {
        return this.api.post(this.passwordResetStartUrl, { email });
    }

    passwordReset(params: any): Observable<any> {
        return this.api.post(this.passwordResetUrl, params);
    }

    activateAccount(params: UserActivateParams): Observable<any> {
        return this.api.post(this.activateAccountUrl, params);
    }

    isLoggedIn(): Observable<any> {
       return this.api.get('/currentUser').map(user => user.id !== -1);
    }
}
