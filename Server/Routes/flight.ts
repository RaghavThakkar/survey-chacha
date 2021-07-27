// modules required for routing
import express from 'express';

const router = express.Router();
export default router;

import { DisplayFlight, ProcessFlightAdd, AddPassanger, UpdatePassangerDetails, GetPassngerDetailsId, ProcessTicketDelete, GetTicketList, createData, CreateSurvey, CreateOrUpdateSurvey } from '../Controllers/flightController';
import Flight from '../Models/flights';
import Ticket from '../Models/tickets';

/* GET home page. wildcard */
router.get('/', DisplayFlight);
router.get('/cs', CreateSurvey);
router.get('/ticket/delete/:id', ProcessTicketDelete);

router.post('/book/:id', AddPassanger);
router.get('/ticket-list', GetTicketList);
router.get('/create', createData);
router.get('/flights/ticket/:id', GetPassngerDetailsId);
router.get('/flights/cs', CreateSurvey);
router.post('/cs', CreateOrUpdateSurvey);
router.post('/flights/:fid/ticket/:id', UpdatePassangerDetails);

