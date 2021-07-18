// modules required for routing
import express from 'express';

const router = express.Router();
export default router;

import { DisplayFlight, ProcessFlightAdd, ProcessTicketDelete } from '../Controllers/flight';
import Flight from '../Models/flights';
import Ticket from '../Models/tickets';

/* GET home page. wildcard */
router.get('/', DisplayFlight);

router.get('/ticket/delete/:id', ProcessTicketDelete);

//router.get('/add', ProcessFlightAdd);
router.get('/book/:id', (req, res, next) => {
    let id = req.params['id'];
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



});

router.get('/flights/ticket/:id', (req, res, next) => {
    console.log("12121");
    let id = req.params['id'];
    Ticket.findById(id, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        let ticket = item.toObject();

        Flight.findById(ticket.Flight, {}, {}, (err, fitem) => {
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





});

router.get('/ticket-list', (req, res, next) => {

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



});

router.post('/flights/:fid/ticket/:id', (req, res, next) => {
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


});

router.post('/book/:id', (req, res, next) => {
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


});
