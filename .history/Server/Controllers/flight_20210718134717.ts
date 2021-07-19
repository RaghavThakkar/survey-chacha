import express, { Request, Response, NextFunction } from 'express';

import Flight from '../Models/flights';
import Ticket from '../Models/tickets';

export function DisplayFlight(req: Request, res: Response, next: NextFunction): void {


    Flight.find(function (err, flightList) {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('flights/index', { title: 'Flights', page: 'index', flights: flightList });

    });

}