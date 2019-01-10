import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor(private _http: HttpClient) { }

  getIncidents(): Observable<any> {
    return this._http.get<any>(environment.apiUrl + '/incident/search/findAllByOrderByTimeDesc');
  }

  getIncidentsByStatus(status: string): Observable<any> {
    const queryParam = new HttpParams().set('status', status.toString());

    return this._http.get<any>(environment.apiUrl + '/incident/search/findAllByStatusOrderByTimeDesc', {params : queryParam});
  }

  updateIncidentStatus(id: number, status: string): Observable<any> {
    let queryParam = new HttpParams().set('status', status.toString());
    queryParam = queryParam.append('id', id.toString());

    return this._http.get<any>(environment.apiUrl + '/incident/search/setStatus', {params : queryParam});
  }

  createIncident(description: string): Observable<any> {
    let queryParam = new HttpParams().set('description', description);
    queryParam = queryParam.append('email', localStorage.getItem('email'));

    return this._http.request<any>('post', environment.apiUrl + '/incident/create', {params : queryParam});
  }

  deleteIncident(id: number): Observable<any> {
    return this._http.request<any>('delete', environment.apiUrl + '/incident/' + id);
  }
}
