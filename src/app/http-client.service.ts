import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Currency} from './Currency';
import {ActualExchangeRate} from './ActualExchangeRate';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private getCurrences = 'http://localhost:8080/getallcurrences';

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllCurrences(){
    return this.httpClient.get<Currency[]>(this.getCurrences);
  }

  getActualCurrency(from: string, to: string){
    return this.httpClient.get('http://localhost:8080/getcurrencyexchange/' + from + '/exchange/' + to);
  }

}
