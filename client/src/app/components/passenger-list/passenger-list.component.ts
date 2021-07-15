import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/models/passenger.model';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.css']
})
export class PassengerListComponent implements OnInit {

  passengers?: Passenger[];
  currentPassenger: Passenger = {};
  currentIndex = -1;
  firstname = '';

  constructor(private passengerService: PassengerService) { }

  ngOnInit(): void {
    this.retrievePassengers();
  }

  retrievePassengers(): void {
    this.passengerService.getAll()
      .subscribe(
        data => {
          this.passengers = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrievePassengers();
    this.currentPassenger = {};
    this.currentIndex = -1;
  }

  setActivePassenger(passenger: Passenger, index: number): void {
    this.currentPassenger = passenger;
    this.currentIndex = index;
  }

  removeAllPassenger(): void {
    this.passengerService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchName(): void {
    this.currentPassenger = {};
    this.currentIndex = -1;

    this.passengerService.findByName(this.firstname)
      .subscribe(
        data => {
          this.passengers = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
