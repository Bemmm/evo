import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { UserService, SelectedPhotosService, PreviewParamsService, ToastrService } from 'app/core/services';
import { ErrorResponse } from 'app/shared/models';

@Injectable()
export class ErrorHandlerService {

    constructor(
        private router: Router,
        private userService: UserService,
        private selectedPhotosService: SelectedPhotosService,
        private previewParamsService: PreviewParamsService,
        private toastrService: ToastrService
    ) { }

    errorHandler(err: Response) {
        if (err.status === 401) {
            this.onUnauthorized(err);
        }

        if (err.status === 0 || err.status >= 500) {
            this.onServerError(err.status);
        }

        return Observable.throw(err);
    }

    unauthorizedHandler(err: Response) {
        if (err.status === 401) {
            this.onUnauthorized(err);
        }

        return Observable.throw(err);
    }

    onUnauthorized(err: Response) {
        this.userService.remove();
        this.selectedPhotosService.clear();
        this.previewParamsService.clear();

        let errorText: string;
        const defaultErrorText = 'Your session has expired.';

        try {
            const error: ErrorResponse = err.json();
            errorText = error.messages.map(message => message.text).join(' ') || defaultErrorText;
        } catch (e) {
            errorText = defaultErrorText;
        }

        this.toastrService.showError(errorText, 'Unauthorized');
        this.router.navigateByUrl('/login');
    }

    onServerError(status: number) {
        const message = status === 0 || status === 504 ? 'Server is down.' : 'Unexpected server error occurred.';

        this.toastrService.showError(message, 'Server Error');
    }

}
