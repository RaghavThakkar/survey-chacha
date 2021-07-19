import { Console } from 'console';
import express, { Request, Response, NextFunction } from 'express';

import Flight from '../Models/flights';
import Ticket from '../Models/tickets';

export function DisplayFlight(req: Request, res: Response, next: NextFunction): void {


    Flight.find({}, null, {sort: {Price: 1}},function(err,flightList){
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('flights/index', { title: 'Flights', page: 'index', flights: flightList });

    });

}

export function ProcessFlightAdd(req: Request, res: Response, next: NextFunction): void {


    let newFlight = new Flight
        ({

            "Airline": "Air Canada",
            "AirlingNumber": "AI 234",
            "From": "YYZ",
            "To": "JFK",
            "Price": 500,
            "Seat": 300,
            "FromTime": "10:00",
            "ToTime": "13:00"

        });

    Flight.create(newFlight, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.redirect('/');
    });
}


export function ProcessTicketDelete(req: Request, res: Response, next: NextFunction): void {
    let id = req.params.id;

    // db.clothing.remove({"_id: id"})
    Ticket.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.redirect('/flights/ticket-list');
    });
}
