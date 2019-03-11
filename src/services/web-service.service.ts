import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  constructor(private http: HttpClient) { }
  // httpSubPost(url, body) {
  //   return this.http.post(url, body);
  // }
  httpPost(url, body) {
    const promise = new Promise((resolve, reject) => {
      this.http.post(url, body)
        .toPromise()
        .then(
          res => {
            if (res) {
              resolve(res);
            }
          },
          errMsg => {
            reject(errMsg);
          }
        );
    });
    return promise;
  }
  httpGet(url) {
    const promise = new Promise((resolve, reject) => {
      this.http.get(url)
        .toPromise()
        .then(
          res => {
            if (res) {
              resolve(res);
            }
          },
          errMsg => {
            reject(errMsg);
          }
        );
    });
    return promise;
  }
  loggedIn() {
    return !!localStorage.getItem('access_token');
  }
  logout() {
    return localStorage.removeItem('access_token');
  }
}
