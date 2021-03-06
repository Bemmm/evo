import { Injectable } from '@angular/core';
import { encrypt, decrypt } from 'app/shared/helpers';

@Injectable()
export class LocalStorageService {

    getItem(key: string, secure?: boolean): any | null {
        let result = localStorage.getItem(key);

        if (!result) {
            return null;
        }

        try {
            if (secure) {
                result = decrypt(result);
            }

            result = JSON.parse(result);
        } catch (e) {
            result = null;
        }

        return result;
    }

    setItem(key: string, value: any, secure?: boolean) {
        let jsonString;

        try {
            jsonString = JSON.stringify(value);

            if (secure) {
                jsonString = encrypt(jsonString);
            }
        } catch (e) {
            console.error(e, 'Storage set item error');
        }

        localStorage.setItem(key, jsonString)
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }

}