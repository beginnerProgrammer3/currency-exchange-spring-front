import { Component, OnInit } from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {HistoryData} from '../HistoryData';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [HomeComponent]
})
export class ChartComponent implements OnInit {
  history: HistoryData[];
  data: string[];
  constructor(private homeComponent: HomeComponent) { }
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public line = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: [this.history], label: 'Open'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Closed'},
    {data: [11, 11, 11, 11, 11, 11, 11], label: 'High'},
    {data: [38, 58, 30, 29, 56, 87, 10], label: 'Low'}
  ];

  ngOnInit(): void {
    this.history = this.homeComponent.history;
    console.log(this.homeComponent.history);
  }

}
