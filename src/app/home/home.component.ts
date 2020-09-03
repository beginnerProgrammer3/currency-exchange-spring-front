import {Component, Injectable, OnInit} from '@angular/core';
import {Currency} from '../Currency';
import {HttpClientService} from '../http-client.service';
import {HistoryData} from '../HistoryData';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  isValid = false;
  selectedCurrency1 = '';
  currency1onPage = '';
  selectedCurrency2 = '';
  currency2onPage = '';
  value1 = null;
  history: HistoryData[];
  currencies: Currency[];
  actualRate: any;
  howmuch = '';
  loadData = false;
  data: Array<any> = [];
  open: Array<any> = [];
  close: Array<any> = [];
  high: Array<any> = [];
  low: Array<any> = [];
  requestError: string = null;
  currencyError: string = null;


  constructor(private httpClientService: HttpClientService) {
  }

  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  public barChartLabels = this.data;
  public line = 'line';
  public barChartLegend = true;
  public barChartData = [
    {data: this.open, label: 'Open'},
    {data: this.close, label: 'Closed'},
    {data: this.high, label: 'High'},
    {data: this.low, label: 'Low'}
  ];

  ngOnInit(): void {
    this.httpClientService.getAllCurrences().subscribe(data => {
      this.currencies = data;
    }, error => {
      console.log(error.message);
    });
  }


  getCurrency(form: NgForm) {
    this.isValid = false;
    if (form.invalid) {
      return;
    }
    this.isValid = true;
    this.httpClientService.getActualCurrencyRate(this.selectedCurrency1, this.selectedCurrency2).subscribe(data => {
      this.actualRate = data;
      this.currency1onPage = this.selectedCurrency1;
      this.currency2onPage = this.selectedCurrency2;
      this.value1 = this.actualRate;
    }, error => this.currencyError = ' ...seems that this api cant convert these currences that fast, try again');
  }

  getDailyChartCurrencyHistory() {
    this.clearDataFromArrays();
    this.httpClientService.getDailyHistoryOfCurrenciesRate(this.selectedCurrency1, this.selectedCurrency2)
      .subscribe(data => {
        this.history = data;
        console.log(this.history);
        this.loadData = true;
        this.getData();
        this.requestError = '';
        }, error => this.requestError = '... ... ..seems that for this currencies you cant get daily history');

  }

  getMonthlyChartCurrencyHistory() {
    this.clearDataFromArrays();
    this.httpClientService.getMonthlyHistoryOfCurrenciesRate(this.selectedCurrency1, this.selectedCurrency2)
      .subscribe(data => {
        this.history = data;
        console.log(history);
        this.loadData = true;
        this.getData();
        this.requestError = '';
        }, error => this.requestError = '... ... ..seems that for this currencies you cant get monthly history');

  }


  getWeeklyChartCurrencyHistory() {
    this.clearDataFromArrays();
    this.httpClientService.getWeeklyHistoryOfCurrenciesRate(this.selectedCurrency1, this.selectedCurrency2)
      .subscribe(data => {
        this.history = data;
        console.log(data);
        this.loadData = true;
        this.getData();
        this.requestError = '';
      } , error => this.requestError = '... ... ..seems that for this currencies you cant get weekly history');
  }

  getData() {
    if (this.loadData === true) {
      this.history.map(value => this.data.push(value.date));
      this.history.map(value => this.open.push(value.open));
      this.history.map(value => this.close.push(value.close));
      this.history.map(value => this.low.push(value.low));
      this.history.map(value => this.high.push(value.high));
      console.log("added");
    }
    }
   clearDataFromArrays() {
    if (this.low.length >= 1) {
      this.low.splice(0, this.low.length);
      this.open.splice(0, this.open.length);
      this.data.splice(0, this.data.length);
      this.high.splice(0, this.high.length);
      this.close.splice(0, this.close.length);
    }
  }
}


