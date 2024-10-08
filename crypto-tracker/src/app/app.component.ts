import { Component } from '@angular/core';
import { CurrencyService } from './service/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectedCurrency : string = "INR";
  constructor(private currencyService : CurrencyService){

  }
  sendCurrency($event: any){
    console.log(event);
    this.currencyService.setCurrency($event);
  }
}
