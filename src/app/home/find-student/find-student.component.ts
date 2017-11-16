import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { CustomTableOptions, CustomTableData } from 'app/shared/models';
import { ApiService, DatesService } from 'app/core/services';

import { AddStudentModalComponent } from './add-student-modal/add-student-modal.component';

const tableOptions: CustomTableOptions = {
    cols: [
        {
            id: (col: any, data: any): string => data.firstName + ' ' + data.lastName,
            label: 'student name',
            width: '70%'
        }, {
            id: 'grade',
            label: 'Grade',
            width: '16%'
        }, {
            id: '',
            label: '',
            linkLabel: 'add student'
        }
    ]
};

@Component({
    selector: 'evo-find-student',
    templateUrl: './find-student.component.html',
    styleUrls: ['./find-student.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FindStudentComponent implements OnDestroy {
    EVENT_CODE_NOT_FOUND = 'eventCodeNotFound';
    EVENT_CODE_NOT_ACTIVE = 'eventCodeNotActive';
    STUDENT_ALREADY_ADDED = 'studentAlreadyAdded';

    tableOptions: CustomTableOptions = tableOptions;
    tableData: CustomTableData;
    data: any;
    modalRef: NgbModalRef

    constructor(
        private modalService: NgbModal,
        private api: ApiService,
        private datesService: DatesService,
        private router: Router
    ) { }

    ngOnDestroy() {
        if (this.modalRef) {
            this.dismiss();
        }
    }

    onSearchResults(data: any) {
        this.data = data;
        this.tableData = null;
        if (data && data.success && data.items.length) {
            this.tableData = {
                rows: data.items
            };
        }
    }

    onAction(e: any) {
        if (e.row.hasAddress) {
            this.modalRef = this.modalService.open(AddStudentModalComponent, {
                backdrop: 'static'
            });
            this.modalRef.result.then(result => {
                e.row._hideLink = result
                if (result) {
                    e.refreshTable();
                }
            }, (reason) => { });
            this.modalRef.componentInstance.data = e.row;
        } else {
            this.api.post('associateStudentToAccount', {
                studentId: e.row.id,
                streetNumber: ''
            })
                .subscribe((res: any) => {
                    this.modalRef = this.modalService.open(AddStudentModalComponent, {
                        backdrop: 'static'
                    });
                    this.modalRef.result.then(result => {
                        e.row._hideLink = result
                        if (result) {
                            e.refreshTable();
                        }
                    });
                    this.modalRef.componentInstance.data = e.row;
                    this.modalRef.componentInstance.result = res;
                });
        }
    }

    onViewPhotos() {
        this.router.navigate(['preview']);
    }

    getEffectiveStartDateOfEvent() {
        return this.datesService.parseZone(this.data.effectiveStartDateOfEvent)
            .format(DatesService.MEDIUM_DATE_FORMAT); // excluding local time zone
    }

    dismiss() {
        this.modalRef.dismiss();
        this.modalRef = null;
    }
}