import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _http: HttpClient) { }

  getNotifications(): Observable<Notification[]> {
    return this._http.get<Notification[]>(environment.apiUrl + '/notification/get');
  }
}
