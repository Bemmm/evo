import { userRoles } from 'app/shared/constants';

export interface UserInfo {
    firstname: string | null,
    lastname: string | null,
    username: string,
    roles: string[],
    isLogged: boolean
}

export interface UserLoginResponse {
    logedUser: UserInfo,
    success: boolean
}

export interface UserActivateParams {
    email: string,
    userId: string,
    uuidKey: string
}

export class User implements UserInfo {
    constructor(
        public firstname: string | null,
        public lastname: string | null,
        public username: string,
        public roles: string[] = [],
        public isLogged: boolean
    ) { }

    getFullName(): string {
        return `${this.firstname} ${this.lastname}`;
    }

    isConsumerCare(): boolean {
        return this.roles.indexOf(userRoles.CONSUMER_CARE) !== -1;
    }

    isSuperviser(): boolean {
        return this.roles.indexOf(userRoles.SUPERVISER) !== -1;
    }

    isLoggedIn(): boolean {
        return this.isLogged;
    }
}

export interface UserAccountInfo {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    middleName: string,
    guest: boolean,
    title: string,
    roles: string,
    emailAddress: string,
    faxPhoneNumber: string,
    mobilePhoneNumber: string,
    businessPhoneNumber: string,
    createdBy: string,
    createdDate: string,
    lastUpdateBy: string,
    lastUpdateDate: string,
    status: string,
    activationKey: string,
    profileGuid: string,
    fullName: string
}
