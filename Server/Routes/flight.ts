// modules required for routing
import express from 'express';

const router = express.Router();
export default router;

import { DisplayFlight, ProcessFlightAdd, AddPassanger, UpdatePassangerDetails, GetPassngerDetailsId, ProcessTicketDelete, GetFlightsDetailsById, GetTicketList, createData } from '../Controllers/flightController';
import Flight from '../Models/flights';
import Ticket from '../Models/tickets';

/* GET home page. wildcard */
router.get('/', DisplayFlight);
router.get('/ticket/delete/:id', ProcessTicketDelete);
router.get('/book/:id', GetFlightsDetailsById);
router.post('/book/:id', AddPassanger);
router.get('/ticket-list', GetTicketList);
router.get('/create', createData);
router.get('/flights/ticket/:id', GetPassngerDetailsId);
router.post('/flights/:fid/ticket/:id', UpdatePassangerDetails);

