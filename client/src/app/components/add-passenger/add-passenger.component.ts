import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/models/passenger.model';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {

  constructor(private passengerService: PassengerService) { }

  ngOnInit(): void {
  }
  passenger: Passenger = {
    firstname: '',
    middlename: '',
    surname: '',
    phone: '',
    email: '',
    date: '',
    gender: ''
  };
  submitted = false;



  savePassenger(): void {
    const data = {
      firstname: this.passenger.firstname,
      middlename: this.passenger.middlename,
      surname: this.passenger.surname,
      phone: this.passenger.phone,
      email: this.passenger.email,
      date: this.passenger.date,
      gender: this.passenger.gender

    };

    this.passengerService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newPassenger(): void {
    this.submitted = false;
    this.passenger = {
      firstname: '',
      middlename: '',
      surname: '',
      phone: '',
      email: '',
      date: '',
      gender: ''
    };
  }

}
