import { Component, OnInit } from '@angular/core';
import {Currency} from '../Currency';
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
  currencies: Currency[];
  actualRate: any;
  value1 = null;
  howmuch = '';
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
    this.httpClientService.getActualCurrency(this.selectedCurrency1, this.selectedCurrency2).subscribe(data => {
      this.actualRate = data;
      this.value1 = this.actualRate;
    }, error => {
      console.log(error.message);
    });


    console.log(this.howmuch);
  }
}
