import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectedCountry = 'INR';
  constructor(){}
  sendCurrency($event: any){
    console.log(event);
    
  }
}
