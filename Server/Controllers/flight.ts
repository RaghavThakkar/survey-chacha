import { Console } from 'console';
import express, { Request, Response, NextFunction } from 'express';

import Flight from '../Models/flights';
import Ticket from '../Models/tickets';

export function DisplayFlight(req: Request, res: Response, next: NextFunction): void {


    Flight.find({}, null, { sort: { Price: 1 } }, function (err, flightList) {
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


export function GetFlightsDetailsById(req: Request, res: Response, next: NextFunction): void {
    let id = req.params['id'];
    // db.clothing.remove({"_id: id"})
    Flight.findById(id, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('flights/details', {
            title: 'Passanger Details',
            page: 'details',
            flight: item
        });
    });
}

export function GetTicketList(req: Request, res: Response, next: NextFunction): void {

    Ticket.find((err, tickets) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('flights/ticket', {
            title: 'Ticket List',
            page: 'ticket-list',
            tickets: tickets
        });
    });
}

export function AddPassanger(req: Request, res: Response, next: NextFunction): void {
    // db.clothing.remove({"_id: id"})
    let id = req.params['id'];
    Flight.findById(id, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        let newTicket = new Ticket
            ({
                "FirstName": req.body.firstName,
                "LastName": req.body.lastName,
                "Gender": req.body.gender,
                "Email": req.body.email,
                "PhoneNumber": req.body.phoneNumber,
                "DOB": req.body.dob,
                "Flight": item
            });

        Ticket.create(newTicket, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }

            res.redirect('/flights/ticket-list');
        });
    });
}

export function GetPassngerDetailsId(req: Request, res: Response, next: NextFunction): void {
    // db.clothing.remove({"_id: id"}
    let id = req.params['id'];
    Ticket.findById(id, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        let ticket = item.toObject();

        Flight.findById(ticket.id, {}, {}, (err, fitem) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.render('flights/details', {
                title: 'Passanger Details',
                page: 'details',
                flight: fitem
            });

        });
    });
}

export function UpdatePassangerDetails(req: Request, res: Response, next: NextFunction): void {
    let fid = req.params['fid'];
    let id = req.params['id'];
    Flight.findById(fid, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }

        let updateTicket = new Ticket
            ({
                "_id": id,
                "FirstName": req.body.firstName,
                "LastName": req.body.lastName,
                "Gender": req.body.gender,
                "Email": req.body.email,
                "PhoneNumber": req.body.phoneNumber,
                "DOB": req.body.dob,
                "Flight": item
            });

        Ticket.updateOne({ _id: id }, updateTicket, {}, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }

            res.redirect('/flights/ticket-list');
        });
    });
}