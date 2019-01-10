import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { IncidentService } from '../services/incident.service';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-report-incident',
  templateUrl: './report-incident.component.html',
  styleUrls: ['./report-incident.component.css']
})
export class ReportIncidentComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  description = null;
  showMessage = false;

  constructor(private _incidentService: IncidentService, private _ngZone: NgZone) { }

  ngOnInit() {
    this.showMessage = false;
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSubmit() {
    if (this.description !== null && this.description !== '') {
      this._incidentService.createIncident(this.description).subscribe(data => {
        console.log(data);
        this.description = null;
        this.showMessage = true;
      });
    }
  }

}
