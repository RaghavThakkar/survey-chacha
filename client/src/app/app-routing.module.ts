import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassengerListComponent } from './components/passenger-list/passenger-list.component'; 
import { PassengerDetailsComponent } from './components/passenger-details/passenger-details.component'; 
import { AddPassengerComponent } from './components/add-passenger/add-passenger.component'; 

const routes: Routes = [
  { path: '', redirectTo: 'passengers', pathMatch: 'full' },
  { path: 'passengers', component: PassengerListComponent },
  { path: 'passengers/:id', component: PassengerDetailsComponent },
  { path: 'add', component: AddPassengerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }