import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeasurementService } from '../services/measurement.service';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit, OnDestroy {
  constructor(private _measurementService: MeasurementService) {}

  poller: any;
  subscription: any;

  public chartType = 'line';

  public chartDatasets: Array<any> = [
    { data: [], label: '' }
  ];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 255, 0, .2)',
      borderColor: 'rgba(0, 255, 50, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  ngOnInit(): void {
    this.poller = interval(10000).pipe(
      startWith(0),
      switchMap(() => this._measurementService.getMeasurementsByType())
    );
    this.subscription = this.poller.subscribe(measurements => {
      const label = 'PH';
      const data = [];
      this.chartLabels = [];
      measurements.forEach(measurement => {
        data.push(measurement.value);
        this.chartLabels.push(new Date(10000 * measurement.time).toISOString().substr(11, 8));
      });
      this.chartDatasets = [{data, label}];
    });
  }

  ngOnDestroy(): void {
    console.log(this.subscription);
    this.subscription.unsubscribe();
  }

}
