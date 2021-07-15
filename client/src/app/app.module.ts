import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AddPassengerComponent } from './components/add-passenger/add-passenger.component';
import { PassengerDetailsComponent } from './components/passenger-details/passenger-details.component';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPassengerComponent,
    PassengerDetailsComponent,
    PassengerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
