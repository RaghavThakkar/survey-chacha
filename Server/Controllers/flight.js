"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePassangerDetails = exports.GetPassngerDetailsId = exports.AddPassanger = exports.GetTicketList = exports.GetFlightsDetailsById = exports.ProcessTicketDelete = exports.ProcessFlightAdd = exports.DisplayFlight = void 0;
const flights_1 = __importDefault(require("../Models/flights"));
const tickets_1 = __importDefault(require("../Models/tickets"));
function DisplayFlight(req, res, next) {
    flights_1.default.find({}, null, { sort: { Price: 1 } }, function (err, flightList) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('flights/index', { title: 'Flights', page: 'index', flights: flightList });
    });
}
exports.DisplayFlight = DisplayFlight;
function ProcessFlightAdd(req, res, next) {
    let newFlight = new flights_1.default({
        "Airline": "Air Canada",
        "AirlingNumber": "AI 234",
        "From": "YYZ",
        "To": "JFK",
        "Price": 500,
        "Seat": 300,
        "FromTime": "10:00",
        "ToTime": "13:00"
    });
    flights_1.default.create(newFlight, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/');
    });
}
exports.ProcessFlightAdd = ProcessFlightAdd;
function ProcessTicketDelete(req, res, next) {
    let id = req.params.id;
    tickets_1.default.remove({ _id: id }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/flights/ticket-list');
    });
}
exports.ProcessTicketDelete = ProcessTicketDelete;
function GetFlightsDetailsById(req, res, next) {
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
}
exports.GetFlightsDetailsById = GetFlightsDetailsById;
function GetTicketList(req, res, next) {
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
}
exports.GetTicketList = GetTicketList;
function AddPassanger(req, res, next) {
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
}
exports.AddPassanger = AddPassanger;
function GetPassngerDetailsId(req, res, next) {
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
}
exports.GetPassngerDetailsId = GetPassngerDetailsId;
function UpdatePassangerDetails(req, res, next) {
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
}
exports.UpdatePassangerDetails = UpdatePassangerDetails;
//# sourceMappingURL=flight.js.map