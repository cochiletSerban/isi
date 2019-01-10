import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Measurement } from '../models/measurement';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  type = 'PH';

  constructor(private _http: HttpClient) { }

  getMeasurementsByType(): Observable<Measurement[]> {
    const queryParam = new HttpParams().set('type', this.type);

    return this._http.get<Measurement[]>(environment.apiUrl + '/measurement/getByType', {params : queryParam});
  }
}
