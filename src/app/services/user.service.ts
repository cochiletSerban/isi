import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {
    this.userSubject = new Subject<string>();
  }

  userSubject: Subject<string>;

  login(email: string, password: string): Observable<any> {
    return this._http.request('post', environment.apiUrl + '/login', {body : {
      email: email,
      password: password
    }});
  }

  register(email: string, password: string, username: string): Observable<any> {
    console.log("easdf");
    
    return this._http.request('post', environment.apiUrl + '/register', {body : {
      email: email,
      password: password,
      userType: 'VOLUNTEER',
      username: username
    }});
  }
}
