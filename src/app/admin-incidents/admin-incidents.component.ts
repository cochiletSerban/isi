import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../services/incident.service';
import { Incident } from '../models/incident';

@Component({
  selector: 'app-admin-incidents',
  templateUrl: './admin-incidents.component.html',
  styleUrls: ['./admin-incidents.component.css']
})
export class AdminIncidentsComponent implements OnInit {

  constructor(private _incidentService: IncidentService) { }

  incidents: Incident[];
  approvedIncidents: Incident[];
  declinedIncidents: Incident[];
  waitingIncidents: Incident[];

  ngOnInit() {
    this.refreshIncidents();
  }

  refreshIncidents() {
    this._incidentService.getIncidents().subscribe(data => {
      console.log(data);
      this.incidents = data._embedded.Incident;
      this.approvedIncidents = this.incidents.filter(incident => incident.status === 'APPROVED');
      this.declinedIncidents = this.incidents.filter(incident => incident.status === 'DECLINED');
      this.waitingIncidents = this.incidents.filter(incident => incident.status === 'WAITING');
      console.log(this.incidents);
      console.log(this.approvedIncidents);
      console.log(this.declinedIncidents);
      console.log(this.waitingIncidents);
    });
  }

  approve(incidentId: number) {
    this._incidentService.updateIncidentStatus(incidentId, 'APPROVED').subscribe(data => {
      this.refreshIncidents();
    });
  }

  decline(incidentId: number) {
    this._incidentService.updateIncidentStatus(incidentId, 'DECLINED').subscribe(data => {
      this.refreshIncidents();
    });
  }

  delete(incidentId: number) {
    this._incidentService.deleteIncident(incidentId).subscribe(data => {
      this.refreshIncidents();
    });
  }

}
