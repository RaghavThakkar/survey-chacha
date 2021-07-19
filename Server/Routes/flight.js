"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const flight_1 = require("../Controllers/flight");
router.get('/', flight_1.DisplayFlight);
router.get('/ticket/delete/:id', flight_1.ProcessTicketDelete);
router.get('/book/:id', flight_1.GetFlightsDetailsById);
router.post('/book/:id', flight_1.AddPassanger);
router.get('/ticket-list', flight_1.GetTicketList);
router.get('/flights/ticket/:id', flight_1.GetPassngerDetailsId);
router.post('/flights/:fid/ticket/:id', flight_1.UpdatePassangerDetails);
//# sourceMappingURL=flight.js.map