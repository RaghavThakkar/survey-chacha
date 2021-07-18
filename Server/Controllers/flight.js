"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessFlightAdd = exports.DisplayFlight = void 0;
const flights_1 = __importDefault(require("../Models/flights"));
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
//# sourceMappingURL=flight.js.map