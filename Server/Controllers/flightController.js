"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePassangerDetails = exports.CreateSurvey = exports.GetPassngerDetailsId = exports.AddPassanger = exports.GetTicketList = exports.createData = exports.CreateOrUpdateSurvey = exports.ProcessTicketDelete = exports.ProcessFlightAdd = exports.DisplayFlight = void 0;
const flights_1 = __importDefault(require("../Models/flights"));
const tickets_1 = __importDefault(require("../Models/tickets"));
const Survey_1 = __importDefault(require("../Models/Survey"));
const Option_1 = __importDefault(require("../Models/Option"));
const questions_1 = __importDefault(require("../Models/questions"));
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
function CreateOrUpdateSurvey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req);
            const q1o1 = yield Option_1.default.create(new Option_1.default({ option: req.body.q1o1 }));
            const q1o2 = yield Option_1.default.create(new Option_1.default({ option: req.body.q1o2 }));
            const q1o3 = yield Option_1.default.create(new Option_1.default({ option: req.body.q1o3 }));
            const q1o4 = yield Option_1.default.create(new Option_1.default({ option: req.body.q1o4 }));
            const q2o1 = yield Option_1.default.create(new Option_1.default({ option: req.body.q2o1 }));
            const q2o2 = yield Option_1.default.create(new Option_1.default({ option: req.body.q2o2 }));
            const q2o3 = yield Option_1.default.create(new Option_1.default({ option: req.body.q2o3 }));
            const q2o4 = yield Option_1.default.create(new Option_1.default({ option: req.body.q2o4 }));
            const q3o1 = yield Option_1.default.create(new Option_1.default({ option: req.body.q3o1 }));
            const q3o2 = yield Option_1.default.create(new Option_1.default({ option: req.body.q3o2 }));
            const q3o3 = yield Option_1.default.create(new Option_1.default({ option: req.body.q3o3 }));
            const q3o4 = yield Option_1.default.create(new Option_1.default({ option: req.body.q3o4 }));
            const q4o1 = yield Option_1.default.create(new Option_1.default({ option: req.body.q4o1 }));
            const q4o2 = yield Option_1.default.create(new Option_1.default({ option: req.body.q4o2 }));
            const q4o3 = yield Option_1.default.create(new Option_1.default({ option: req.body.q4o3 }));
            const q4o4 = yield Option_1.default.create(new Option_1.default({ option: req.body.q4o4 }));
            const q5o1 = yield Option_1.default.create(new Option_1.default({ option: req.body.q5o1 }));
            const q5o2 = yield Option_1.default.create(new Option_1.default({ option: req.body.q5o2 }));
            const q5o3 = yield Option_1.default.create(new Option_1.default({ option: req.body.q5o3 }));
            const q5o4 = yield Option_1.default.create(new Option_1.default({ option: req.body.q5o4 }));
            const q1 = new questions_1.default({
                question: req.body.q1,
                optionsList: [q1o1, q1o2, q1o3, q1o4],
                type: "2"
            });
            const q2 = new questions_1.default({
                question: req.body.q2,
                optionsList: [q2o1, q2o2, q2o3, q2o4],
                type: "2"
            });
            const q3 = new questions_1.default({
                question: req.body.q3,
                optionsList: [q3o1, q3o2, q3o3, q3o4],
                type: "2"
            });
            const q4 = new questions_1.default({
                question: req.body.q4,
                optionsList: [q4o1, q4o2, q4o3, q4o4],
                type: "2"
            });
            const q5 = new questions_1.default({
                question: req.body.q1,
                optionsList: [q5o1, q5o2, q5o3, q5o4],
                type: "2"
            });
            const newQ1 = yield questions_1.default.create(q1);
            const newQ2 = yield questions_1.default.create(q2);
            const newQ3 = yield questions_1.default.create(q3);
            const newQ4 = yield questions_1.default.create(q4);
            const newQ5 = yield questions_1.default.create(q5);
            const survey = new Survey_1.default({
                questions: [newQ1, newQ2, newQ3, newQ4, newQ5],
                active: true,
                userId: 0,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate),
                title: req.body.title,
                description: req.body.description,
            });
            const newSurevy = yield Survey_1.default.create(survey);
            const sl = yield Survey_1.default.find().populate("questions").exec();
            res.render('flights/ticket', {
                title: 'Ticket List',
                page: 'ticket-list',
                sl: sl
            });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.CreateOrUpdateSurvey = CreateOrUpdateSurvey;
function createData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const option1 = new Option_1.default({
                option: "BMW"
            });
            const option2 = new Option_1.default({
                option: "Tesla"
            });
            const option3 = new Option_1.default({
                option: "Honda"
            });
            const option4 = new Option_1.default({
                option: "Toyota"
            });
            const newO1 = yield Option_1.default.create(option1);
            const newO2 = yield Option_1.default.create(option2);
            const newO3 = yield Option_1.default.create(option3);
            const newO4 = yield Option_1.default.create(option4);
            const questionList = new questions_1.default({
                question: "What's you favourite car?",
                optionsList: [newO1, newO2, newO3, newO4],
                type: "1"
            });
            const questionList1 = new questions_1.default({
                question: "What's you favourite car model?",
                optionsList: [newO1, newO2, newO3, newO4],
                type: "2"
            });
            const newQuestions = yield questions_1.default.create(questionList);
            const newQuestions2 = yield questions_1.default.create(questionList1);
            const survey = new Survey_1.default({
                questions: [newQuestions, newQuestions2],
                active: true,
                userId: 0,
                startDate: new Date(),
                endDate: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
                title: "title",
                description: "magic"
            });
            const newSurevy = yield Survey_1.default.create(survey);
            const sl = yield Survey_1.default.find().populate("questions").exec();
            res.render('flights/ticket', {
                title: 'Ticket List',
                page: 'ticket-list',
                sl: sl
            });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.createData = createData;
function GetTicketList(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sl = yield Survey_1.default.find().populate({
                path: 'questions',
                model: 'Question',
                populate: {
                    path: 'optionsList',
                    model: 'Option',
                }
            }).exec();
            console.log(sl);
            res.render('flights/ticket', {
                title: 'Ticket List',
                page: 'ticket-list',
                sl: sl
            });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
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
function CreateSurvey(req, res, next) {
    console.log("CreateSurvey");
    res.render('flights/cs', {
        title: 'Create Survey',
        page: 'details',
    });
}
exports.CreateSurvey = CreateSurvey;
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
//# sourceMappingURL=flightController.js.map