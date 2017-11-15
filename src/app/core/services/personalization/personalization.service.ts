import {
    Injectable,
    EventEmitter
} from '@angular/core';

import {
    Observable
} from 'rxjs/Observable';

import {
    PersonalizationApiService
} from 'app/core/services';

import {
    PersonalizationState,
    PersonalizationIcon,
    PersonalizationText,
    PersonalizationSubstrate,
    PersonalizationBackground
} from 'app/shared/models';

@Injectable()
export class PersonalizationService {
    emptyPersonalization: PersonalizationState = {
        backgroundKey: null,
        backgroundName: null,
        background: null,
        text: null,
        icon: null,
        substrate: null
    };
    defaultPersonalization: PersonalizationState;
    personalization: PersonalizationState;
    personalize$ = new EventEmitter();
    apply$ = new EventEmitter();

    constructor(
        private personalizationApiService: PersonalizationApiService
    ) {
        this.resetPersonalization();
        this.onApply = this.onApply.bind(this);
        this.apply$
            .debounceTime(300)
            .subscribe(this.onApply);
    }

    resetPersonalization() {
        this.personalization = this.emptyPersonalization;
    }

    setDefaultPersonalization(defaultPersonalization: PersonalizationState) {
        this.defaultPersonalization = defaultPersonalization;
    }

    setDocument(documentId: string) {
        if (documentId) {
            this.personalization.documentId = documentId;
        }
    }

    setText(text: PersonalizationText, withApply: boolean = true) {
        this.personalization.text = text;

        if (withApply) {
            this.apply$.emit();
        }
    }

    setIcon(icon: PersonalizationIcon, withApply: boolean = true) {
        this.personalization.icon = icon;

        if (withApply) {
            this.apply$.emit();
        }
    }

    setBackground(value: PersonalizationBackground, withApply: boolean = true) {
        this.personalization.backgroundKey = value.key;
        this.personalization.backgroundName = value.name;
        this.personalization.background = value.src;

        if (withApply) {
            this.apply$.emit();
        }
    }

    setSubstrate(value: PersonalizationSubstrate, withApply: boolean = true) {
        this.personalization.substrate = value;

        if (withApply) {
            this.apply$.emit();
        }
    }

    onApply() {
        this.personalizationApiService.personalize(this.personalization)
            .subscribe(res => {
                this.personalize$.emit(res);
            })
    }

    checkPersonalization() {
        if (!this.personalization.text || !this.personalization.icon || !this.personalization.substrate) {
            return;
        }

        const {
            text: { value: textValue },
            icon: { key: iconKey, visible: iconVisible },
            substrate: { opacity: substrateOpacity }
         } = this.personalization;

        const {
            text: { value: defaultTextValue },
            icon: { key: defaultIconKey },
            substrate: { opacity: defaultSubstrateOpacity }
         } = this.defaultPersonalization;

        if (textValue === defaultTextValue) {
            Object.assign(this.personalization.text, this.defaultPersonalization.text);
        }

        if (iconKey === defaultIconKey || !iconVisible) {
            Object.assign(this.personalization.icon, this.defaultPersonalization.icon);
        }

        if (substrateOpacity === defaultSubstrateOpacity) {
            Object.assign(this.personalization.substrate, this.defaultPersonalization.substrate);
        }
    }

    getCheckedPersonalization() {
        this.checkPersonalization();
        return this.personalization;
    }
    
    apply() {
        this.apply$.emit();
    }
}
