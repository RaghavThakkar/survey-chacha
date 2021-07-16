import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Passenger } from 'src/app/models/passenger.model';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-passenger-details',
  templateUrl: './passenger-details.component.html',
  styleUrls: ['./passenger-details.component.css']
})
export class PassengerDetailsComponent implements OnInit {

  currentPassenger: Passenger = {
    firstname: '',
    middlename: '',
    surname: '',
    phone: '',
    email: '',
    date: '',
    gender: ''
  };
  message = '';

  constructor(
    private passengerService: PassengerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getPassenger(this.route.snapshot.params.id);
  }

  getPassenger(id: string): void {
    this.passengerService.get(id)
      .subscribe(
        data => {
          this.currentPassenger = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  updatePassenger(): void {
    this.message = '';

    this.passengerService.update(this.currentPassenger.id, this.currentPassenger)
      .subscribe(
        response => {
          console.log(response);
          this.message = response.message ? response.message : 'This passenger was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deletePassenger(): void {
    this.passengerService.delete(this.currentPassenger.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/passengers']);
        },
        error => {
          console.log(error);
        });
  }
}

