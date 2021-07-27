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




export async function CreateOrUpdateSurvey(req: Request, res: Response, next: NextFunction) {

    try {

        console.log(req);

        const q1o1 = await Option.create(new Option({ option: req.body.q1o1 }));
        const q1o2 = await Option.create(new Option({ option: req.body.q1o2 }));
        const q1o3 = await Option.create(new Option({ option: req.body.q1o3 }));
        const q1o4 = await Option.create(new Option({ option: req.body.q1o4 }));

        const q2o1 = await Option.create(new Option({ option: req.body.q2o1 }));
        const q2o2 = await Option.create(new Option({ option: req.body.q2o2 }));
        const q2o3 = await Option.create(new Option({ option: req.body.q2o3 }));
        const q2o4 = await Option.create(new Option({ option: req.body.q2o4 }));

        const q3o1 = await Option.create(new Option({ option: req.body.q3o1 }));
        const q3o2 = await Option.create(new Option({ option: req.body.q3o2 }));
        const q3o3 = await Option.create(new Option({ option: req.body.q3o3 }));
        const q3o4 = await Option.create(new Option({ option: req.body.q3o4 }));

        const q4o1 = await Option.create(new Option({ option: req.body.q4o1 }));
        const q4o2 = await Option.create(new Option({ option: req.body.q4o2 }));
        const q4o3 = await Option.create(new Option({ option: req.body.q4o3 }));
        const q4o4 = await Option.create(new Option({ option: req.body.q4o4 }));

        const q5o1 = await Option.create(new Option({ option: req.body.q5o1 }));
        const q5o2 = await Option.create(new Option({ option: req.body.q5o2 }));
        const q5o3 = await Option.create(new Option({ option: req.body.q5o3 }));
        const q5o4 = await Option.create(new Option({ option: req.body.q5o4 }));





        const q1 = new Question({
            question: req.body.q1,
            optionsList: [q1o1, q1o2, q1o3, q1o4],
            type: "2"
        });

        const q2 = new Question({
            question: req.body.q2,
            optionsList: [q2o1, q2o2, q2o3, q2o4],
            type: "2"
        });

        const q3 = new Question({
            question: req.body.q3,
            optionsList: [q3o1, q3o2, q3o3, q3o4],
            type: "2"
        });

        const q4 = new Question({
            question: req.body.q4,
            optionsList: [q4o1, q4o2, q4o3, q4o4],
            type: "2"
        });

        const q5 = new Question({
            question: req.body.q1,
            optionsList: [q5o1, q5o2, q5o3, q5o4],
            type: "2"
        });



        const newQ1 = await Question.create(q1);
        const newQ2 = await Question.create(q2);
        const newQ3 = await Question.create(q3);
        const newQ4 = await Question.create(q4);
        const newQ5 = await Question.create(q5);

        const survey = new Survey({
            questions: [newQ1, newQ2, newQ3, newQ4, newQ5],
            active: true,
            userId: 0,
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            title: req.body.title,
            description: req.body.description,
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
            userId: 0,
            startDate: new Date(),
            endDate: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
            title: "title",
            description: "magic"
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
                model: 'Option',

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

export function CreateSurvey(req: Request, res: Response, next: NextFunction): void {
    console.log("CreateSurvey");
    res.render('flights/cs', {
        title: 'Create Survey',
        page: 'details',
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