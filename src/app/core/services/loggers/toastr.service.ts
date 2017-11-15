import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToastrService {

    constructor(private toastsManager: ToastsManager) { }

    showSuccess(message: string, title: string) {
        this.toastsManager.success(message, title);
    }

    showError(message: string, title: string) {
        this.toastsManager.error(message, title);
    }

    showWarning(message: string, title: string) {
        this.toastsManager.warning(message, title);
    }

    showInfo(message: string, title: string) {
        this.toastsManager.info(message, title);
    }

    showCustom(message: string, title: string, options?: { enableHTML?: boolean }) {
        this.toastsManager.custom(message, title, options);
    }

}
