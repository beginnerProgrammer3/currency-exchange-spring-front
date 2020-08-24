export class ActualExchangeRate {
  public id: number;
  public fromCurrencyCode: string;
  public fromCurrencyName: string;
  public toCurrencyCode: string;
  public toCurrencyName: string;
  public exchangeRate: string;
  public lastRefreshed: string;
  public timeZone: string;
  public bidPrice: string;
  public askPrice: string;
  constructor() {
  }
}
