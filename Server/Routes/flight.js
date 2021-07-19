"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const flight_1 = require("../Controllers/flight");
const flights_1 = __importDefault(require("../Models/flights"));
const tickets_1 = __importDefault(require("../Models/tickets"));
router.get('/', flight_1.DisplayFlight);
router.get('/ticket/delete/:id', flight_1.ProcessTicketDelete);
router.get('/book/:id', (req, res, next) => {
    let id = req.params['id'];
    flights_1.default.findById(id, {}, {}, (err, item) => {
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
    tickets_1.default.findById(id, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        let ticket = item.toObject();
        flights_1.default.findById(ticket.id, {}, {}, (err, fitem) => {
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
    tickets_1.default.find((err, tickets) => {
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
    flights_1.default.findById(fid, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        let updateTicket = new tickets_1.default({
            "_id": id,
            "FirstName": req.body.firstName,
            "LastName": req.body.lastName,
            "Gender": req.body.gender,
            "Email": req.body.email,
            "PhoneNumber": req.body.phoneNumber,
            "DOB": req.body.dob,
            "Flight": item
        });
        tickets_1.default.updateOne({ _id: id }, updateTicket, {}, (err) => {
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
    flights_1.default.findById(id, {}, {}, (err, item) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        let newTicket = new tickets_1.default({
            "FirstName": req.body.firstName,
            "LastName": req.body.lastName,
            "Gender": req.body.gender,
            "Email": req.body.email,
            "PhoneNumber": req.body.phoneNumber,
            "DOB": req.body.dob,
            "Flight": item
        });
        tickets_1.default.create(newTicket, (err) => {
            if (err) {
                console.error(err);
                res.end(err);
            }
            res.redirect('/flights/ticket-list');
        });
    });
});
//# sourceMappingURL=flight.js.map