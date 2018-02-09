import { Injectable } from '@angular/core';
import {
  Headers, Http, Response, RequestOptions, URLSearchParams, RequestOptionsArgs,
  ResponseContentType
} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

import { objectToURLSearchParams } from 'app/shared/helpers';

@Injectable()
export class ApiService {
  private headers: Headers = new Headers({
    'Content-Type': 'application/json'
  });
  private options: RequestOptions = new RequestOptions({
    headers: this.headers
  });
  private errorHandler: (err: Response) => any;
  private unauthorizedHandler: (err: Response) => any;
  api_url: string = GLOBAL_ENV && GLOBAL_ENV.API_URL || 'https://user-login-demo.herokuapp.com/api/';

  constructor(
    private http: Http,
  ) {
  }

  private getJson(resp: Response) {
    try {
      return resp.json();
    } catch (err) {
      throw err;
    }
  }

  private checkForError(resp: Response): Response {
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    }

    if (resp.status === 401) {
      console.log('Unauthorized', 401);
      return resp;
    }

    if (resp.status === 404) {
      console.error('API Error Not Found', resp);
    }

    const error = new Error(resp.statusText);
    error['response'] = resp;
    throw error;
  }

  get(path: string, params?: any, token?: any): Observable<any> {
    let ro: RequestOptions;
    if (params || token) {
      ro = new RequestOptions(this.options);
    }
    if (params) {
      ro.search = objectToURLSearchParams(params);
    }
    if (token) {
      ro.headers = new Headers();
      ro.headers.set('x-access-token', token);
    }
    console.log(ro);
    return this.http.get(`${this.api_url}${path}`, ro || this.options)
      .map(this.checkForError)
      .map(this.getJson)
      .catch(this.errorHandler)
  }

  getExternal(path: string, params?: any): Observable<any> {
    let ro: RequestOptions;
    if (params) {
      ro = new RequestOptions(this.options);
      ro.search = objectToURLSearchParams(params);
    }

    return this.http.get(`${path}`, ro || this.options)
      .map(this.checkForError)
      .map(this.getJson)
      .catch(this.errorHandler)
  }

  post(path: string, body: any, token?: string): Observable<any> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    if (token) {
      headers.set('x-access-token', token);
    }
    return this.http.post(`${this.api_url}${path}`, JSON.stringify(body), { headers })
      .map(this.checkForError)
      .map(this.getJson)
      .catch(this.errorHandler)
  }

  postWithBlobResponse(path: string, body: any): Observable<Response> {
    return this.http.post(`${this.api_url}${path}`, body, {
      responseType: ResponseContentType.Blob
    })
    // .catch(this.unauthorizedHandler); // TODO: use here `this.errorHandler` instead when will provide personalization server errors handler
  }

  put(path: string, body: any, token?: string): Observable<any> {
    const headers = new Headers();
    if (token) {
      headers.set('x-access-token', token);
      headers.set('Content-Type', 'application/json');
    }
    return this.http.put(`${this.api_url}${path}`, JSON.stringify(body), { headers })
      .map(this.checkForError)
      .map(this.getJson)
      .catch(this.errorHandler)
  }

  delete(path: string, params?: any, token?: any): Observable<any> {
    let ro: RequestOptions;
    if (params || token) {
      ro = new RequestOptions(this.options);
    }
    if (params) {
      ro.search = objectToURLSearchParams(params);
    }
    if (token) {
      ro.headers = new Headers();
      ro.headers.set('x-access-token', token);
    }
    console.log(ro);
    return this.http.delete(`${this.api_url}${path}`, ro || this.options)
      .map(this.checkForError)
      .map(this.getJson)
      .catch(this.errorHandler)
  }

  setHeaders(headers: any) {
    Object.keys(headers)
      .forEach(header => {
        this.headers.set(header, headers[header]);
      })
  }
  setToken(tokenString: any) {
    console.log('BEMMY!!!', this.headers);
  }
  head(path: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.head(`${this.api_url}${path}`, options);
  }
}
