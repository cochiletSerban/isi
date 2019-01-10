import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../services/incident.service';
import { Incident } from '../models/incident';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.css']
})
export class IncidentsComponent implements OnInit {

  constructor(private _incidentService: IncidentService) { }

  incidents: Incident[];

  ngOnInit() {
    this._incidentService.getIncidentsByStatus('APPROVED').subscribe(data => {
    console.log(data);
    this.incidents = data._embedded.Incident;
    console.log(this.incidents);
  });
  }

}
