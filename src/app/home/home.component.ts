import { Component, OnInit } from '@angular/core';
import {Currency} from '../Currency';
import {HttpClient} from '@angular/common/http';
import {HttpClientService} from '../http-client.service';
import {ActualExchangeRate} from '../ActualExchangeRate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedCurrency1 = '';
  selectedCurrency2 = '';
  public currencies: Currency[];
  public actualRate: ActualExchangeRate = null;

  constructor(private httpClientService: HttpClientService) {
  }

  ngOnInit(): void {
    this.httpClientService.getAllCurrences().subscribe(data => {
      this.currencies = data;
    }, error => {
      console.log(error.message);
    });
  }

  getCurrency() {
    console.log(this.selectedCurrency1 + ' : ' + this.selectedCurrency2);
    this.httpClientService.getActualCurrency(this.selectedCurrency1, this.selectedCurrency2).subscribe(data => {
      this.actualRate = data;
      console.log(this.actualRate);
    }, error => {
      console.log(error.message);
    });
  }

}
