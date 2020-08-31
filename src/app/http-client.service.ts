import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Currency} from './Currency';
import {ActualExchangeRate} from './ActualExchangeRate';
import {HistoryData} from './HistoryData';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllCurrences(){
    return this.httpClient.get<Currency[]>('http://localhost:8080/api/getallcurrences');
  }

  getActualCurrencyRate(from: string, to: string){
    return this.httpClient.get('http://localhost:8080/api/getcurrencyexchangerate/' + from + '/exchange/' + to);
  }

  getDailyHistoryOfCurrenciesRate(from: string, to: string){
    return this.httpClient.get<HistoryData[]>('http://localhost:8080/api/charts/daily/' + from + '/and/' + to);
  }
  getWeeklyHistoryOfCurrenciesRate(from: string, to: string){
    return this.httpClient.get<HistoryData[]>('http://localhost:8080/api/charts/weekly/' + from + '/and/' + to);
  }
  getMonthlyHistoryOfCurrenciesRate(from: string, to: string): Observable<HistoryData[]>{
    return this.httpClient.get<HistoryData[]>('http://localhost:8080/api/charts/monthly/' + from + '/and/' + to);
  }


}
