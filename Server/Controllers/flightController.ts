import { Console } from 'console';
import express, { Request, Response, NextFunction } from 'express';

import Flight from '../Models/flights';
import Ticket from '../Models/tickets';
import Survey from '../Models/Survey';
import Option from '../Models/Option';
import Question from '../Models/questions';

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


export async function GetFlightsDetailsById(req: Request, res: Response, next: NextFunction): void {
    let id = req.params['id'];

    try {

        const item = Flight.findById(id).exec();
        res.render('flights/details', {
            title: 'Passanger Details',
            page: 'details',
            flight: item
        });
    } catch (err) {
        console.error(err);
        res.end(err);
    }


}
export async function createData(req: Request, res: Response, next: NextFunction) {

    try {

        const option1 = new Option({
            option: "BMW"
        });


        const option2 = new Option({
            option: "Tesla"
        });

        const option3 = new Option({
            option: "Honda"
        });

        const option4 = new Option({
            option: "Toyota"
        });
        const newO1 = await Option.create(option1);
        const newO2 = await Option.create(option2);
        const newO3 = await Option.create(option3);
        const newO4 = await Option.create(option4);


        const questionList = new Question({
            question: "What's you favourite car?",
            optionsList: [newO1, newO2, newO3, newO4],
            type: "1"
        });

        const questionList1 = new Question({
            question: "What's you favourite car model?",
            optionsList: [newO1, newO2, newO3, newO4],
            type: "2"

        });

        const newQuestions = await Question.create(questionList);
        const newQuestions2 = await Question.create(questionList1);
        const survey = new Survey({
            questions: [newQuestions, newQuestions2],
            active: true,
            userId: 0
        });
        const newSurevy = await Survey.create(survey);



        const sl = await Survey.find().populate("questions").exec();


        res.render('flights/ticket', {
            title: 'Ticket List',
            page: 'ticket-list',
            sl: sl
        });
    } catch (err) {
        console.error(err);
        res.end(err);
    }


}
export async function GetTicketList(req: Request, res: Response, next: NextFunction) {

    try {

        // const option1 = new Option({
        //     option: "BMW"
        // });


        // const option2 = new Option({
        //     option: "Tesla"
        // });

        // const option3 = new Option({
        //     option: "Honda"
        // });

        // const option4 = new Option({
        //     option: "Toyota"
        // });
        // const newO1 = await Option.create(option1);
        // const newO2 = await Option.create(option2);
        // const newO3 = await Option.create(option3);
        // const newO4 = await Option.create(option4);


        // const questionList = new Question({
        //     question: "What's you favourite car?",
        //     optionsList: [newO1, newO2, newO3, newO4],
        //     type: "1"
        // });

        // const questionList1 = new Question({
        //     question: "What's you favourite car model?",
        //     options: [newO1, newO2, newO3, newO4],
        //     type: "2"

        // });

        // const newQuestions = await Question.create(questionList);
        // const newQuestions2 = await Question.create(questionList1);
        // const survey = new Survey({
        //     questions: [newQuestions, newQuestions2],
        //     active: true,
        //     userId: 0
        // });
        // const newSurevy = await Survey.create(survey);



        const sl = await Survey.find().populate({
            path: 'questions',
            model: 'Question',
            populate: {
                path: 'optionsList',
                model: 'Option'
            }
        }).exec();

        console.log(sl);

        res.render('flights/ticket', {
            title: 'Ticket List',
            page: 'ticket-list',

            sl: sl
        });
    } catch (err) {
        console.error(err);
        res.end(err);
    }


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