import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { SearchStudentModel, SchoolSearchModel } from './search.model';
import { SchoolService, StudentService } from 'app/core/services';

@Component({
    selector: 'evo-find-student-form',
    templateUrl: './find-student-form.component.html',
    styleUrls: ['./find-student-form.component.scss']
})
export class FindStudentFormComponent implements OnInit {
    @Output() result: EventEmitter<any> = new EventEmitter<any>();

    searchForm: FormGroup;
    private emptySearch: any = {
        customerNumber: ['', Validators.required],
        eventCode: ['', Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required]
    };
    private schoolData: SchoolSearchModel[];
    searching = false;

    constructor(
        private fb: FormBuilder,
        private schoolService: SchoolService,
        private studentService: StudentService) {
    }

    ngOnInit() {
        this.searchForm = this.fb.group(this.emptySearch);
    }

    onReset(): void {
        this.result.emit(null);
    }

    onSchoolSearch() {
        this.searchForm.patchValue({
            customerNumber: ''
        });
    }
    onSchoolSelect(e: any) {
        if (e.type) {
            return;
        }
        this.searchForm.patchValue({
            customerNumber: e ? e.item.customerNumber : ''
        });
    }

    onSearchStudent() {
        this.studentService.searchStudent(this.searchForm.getRawValue())
            .subscribe((res) => {
                this.result.emit(res);
            });
    }


}