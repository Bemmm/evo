import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { SelectOption } from 'app/shared/components/select/select.model';

import { Subject } from 'rxjs/Subject';

export interface FilterValue {
    key: string,
    selected: any
}

@Component({
    selector: 'jpix-preview-filters',
    templateUrl: './preview-filters.component.html',
    styleUrls: ['./preview-filters.component.scss']
})
export class PreviewFiltersComponent implements OnInit, OnChanges {
    @Input() eventOptions: SelectOption[];
    @Input() studentOptions: SelectOption[];
    @Input() filterKeys: any;
    @Input() disabled: boolean;
    @Input() selectedFiltersValues: any;
    @Output() change = new EventEmitter<FilterValue>();

    private filter$ = new Subject<FilterValue>();
    defaultEventOptions: SelectOption[] = [
        { value: '', title: 'All events' }
    ];
    defaultStudentOptions: SelectOption[] = [
        { value: '', title: 'All students' }
    ];

    ngOnInit() {
        this.filter$.debounceTime(100).subscribe(value => {
            this.change.emit(value);
        })
    }

    ngOnChanges(changes: any) {
        if (changes.eventOptions && changes.eventOptions.currentValue.length > 0) {
            this.defaultEventOptions = [...this.defaultEventOptions, ...changes.eventOptions.currentValue]
        }

        if (changes.studentOptions && changes.studentOptions.currentValue.length > 0) {
            this.defaultStudentOptions = [...this.defaultStudentOptions, ...changes.studentOptions.currentValue]
        }
    }

    onFilterChange(value: FilterValue) {
        this.filter$.next(value);
    }
}