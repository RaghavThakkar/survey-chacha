"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const flightController_1 = require("../Controllers/flightController");
router.get('/', flightController_1.DisplayFlight);
router.get('/cs', flightController_1.CreateSurvey);
router.get('/ticket/delete/:id', flightController_1.ProcessTicketDelete);
router.post('/book/:id', flightController_1.AddPassanger);
router.get('/ticket-list', flightController_1.GetTicketList);
router.get('/create', flightController_1.createData);
router.get('/flights/ticket/:id', flightController_1.GetPassngerDetailsId);
router.get('/flights/cs', flightController_1.CreateSurvey);
router.post('/cs', flightController_1.CreateOrUpdateSurvey);
router.post('/flights/:fid/ticket/:id', flightController_1.UpdatePassangerDetails);
//# sourceMappingURL=flight.js.map