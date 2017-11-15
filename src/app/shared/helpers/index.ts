import { URLSearchParams } from '@angular/http';
const CryptoJS = require('crypto-js');

const mapObjectToArray = (obj: any) => Object.keys(obj).map(key => obj[key]);
const objectToURLSearchParams = (obj: any): URLSearchParams => {
    let params: URLSearchParams = new URLSearchParams();
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            params.set(key, obj[key]);
        }
    }
    return params;
};
const isInteger = (value: number) => {
    return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
}
const isNumber = (value: number) => {
    return typeof value === 'number' &&
        isFinite(value);
}

const encrypt = (value: string) => {
    const secret = '_jpix-app_';

    return CryptoJS.AES.encrypt(value, secret);
};

const decrypt = (value: string) => {
    const secret = '_jpix-app_';
    const bytes =  CryptoJS.AES.decrypt(value, secret);

    return bytes.toString(CryptoJS.enc.Utf8);
};

export {
    mapObjectToArray,
    objectToURLSearchParams,
    isInteger,
    isNumber,
    encrypt,
    decrypt
};