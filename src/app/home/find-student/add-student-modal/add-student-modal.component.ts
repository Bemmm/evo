import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/core/services';
import { Router } from '@angular/router';

@Component({
    selector: 'jpix-add-student-modal',
    templateUrl: './add-student-modal.component.html',
    styleUrls: ['./add-student-modal.component.scss']
})

export class AddStudentModalComponent {
    @Input() data: any;
    result: any;
    streetNumber: number;

    constructor(public activeModal: NgbActiveModal, private api: ApiService, private router: Router) { }

    onSubmit() {
        this.api.post('associateStudentToAccount', {
            studentId: this.data.id,
            streetNumber: this.streetNumber
        })
        .subscribe(res => this.result = res);
    }

    onViewPhotos() {
        this.router.navigate(['preview']);
    }

    close() {
        this.activeModal.close(this.result && this.result.success);
    }
}