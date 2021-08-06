import { Console } from 'console';
import express, { Request, Response, NextFunction } from 'express';

import Survey from '../Models/Survey';
import Option from '../Models/Option';
import Question from '../Models/questions';
import SurveyResponse from '../Models/SurveyResponse';

import passport from 'passport';

import User from '../Models/user';

import { UserDisplayName } from '../Util'

export async function DisplaySurvey(req: Request, res: Response, next: NextFunction) {

    try {
        const surveyList = await Survey.find().lean().exec()
        const surveyResponse = await SurveyResponse.count().exec();
        console.log(surveyList);
        res.render('survey/index', {
            title: 'list-survey',
            page: 'index',
            items: surveyList,
            responseCount: surveyResponse,
            displayName: UserDisplayName(req)
        });
    } catch (err) {
        console.error(err);
        res.end(err);
    }

}


export async function CreateSurvey(req: Request, res: Response, next: NextFunction) {
    try {
        res.render('survey/add', { title: 'Create Survey', page: 'index', });
    } catch (err) {
        console.error(err);
        res.end(err);
    }
}

export async function DF(req: Request, res: Response, next: NextFunction) {
    try {
        res.render('content/df', { title: 'Create Survey', page: 'index', displayName: UserDisplayName(req) });
    } catch (err) {
        console.error(err);
        res.end(err);
    }
}

export async function ProcessDF(req: Request, res: Response, next: NextFunction) {
    try {
        console.log(req.body);
        res.render('content/df', { title: 'Create Survey', page: 'index', displayName: UserDisplayName(req) });
    } catch (err) {
        console.error(err);
        res.end(err);
    }
}

export async function DisplayThankYou(req: Request, res: Response, next: NextFunction) {
    try {
        res.render('survey/thankyou', { title: 'Thank you', page: 'index' });
    } catch (err) {
        console.error(err);
        res.end(err);
    }
}

export async function TakeSurvey(req: Request, res: Response, next: NextFunction) {
    try {
        let id = req.params.id;

        const item = await Survey.findOne({ _id: id }).populate({
            path: 'questions',
            model: 'Question',
            populate: {
                path: 'optionsList',
                model: 'Option',

            }
        }).exec();

        res.render('survey/take',
            {
                title: 'Take Survey',
                page: 'index',
                data: item
            });
    } catch (err) {
        console.error(err);
        res.end(err);
    }
}
export async function ProcessTakeSurvey(req: Request, res: Response, next: NextFunction) {
    try {
        let id = req.params.id;
        const survey = await Survey.findOne({ _id: id }).exec();

        const surveyresponse = new SurveyResponse(
            {
                questionValue: [req.body.q1Radio, req.body.q2Radio, req.body.q3Radio, req.body.q4Radio, req.body.q5Radio],
                survey: survey,
                ownerId: 0
            }
        );

        const q1o1 = await SurveyResponse.create(surveyresponse);
        res.redirect('/survey/thanks');
    } catch (err) {
        console.error(err);
        res.end(err);
    }
}

export async function DeleteSurvey(req: Request, res: Response, next: NextFunction) {
    try {
        let id = req.params.id;

        const survey = await Survey.findOne({ _id: id }).exec();
        console.log(survey);
        // for (let question in survey.questions) {
        //     for (let option in question.optionList) {
        //         await Option.remove({ _id: option.id }).exec();
        //     }
        //     await Question.remove({ _id: question.id }).exec();

        // }
        await Survey.remove({ _id: id }).exec();
        res.redirect('/survey');
    } catch (err) {
        console.error(err);
        res.end(err);
    }
}

export async function EditSurvey(req: Request, res: Response, next: NextFunction) {
    try {
        let id = req.params.id;

        const item = await Survey.findOne({ _id: id }).populate({
            path: 'questions',
            model: 'Question',
            populate: {
                path: 'optionsList',
                model: 'Option',

            }
        }).exec();
        res.render('survey/edit',
            {
                title: 'Edit Survey',
                page: 'index',
                data: item
            });
    } catch (err) {
        console.error(err);
        res.end(err);
    }
}


export async function ProcessEditSurvey(req: Request, res: Response, next: NextFunction) {
    try {
        let id = req.params.id;

        let item = await Survey.findOne({ _id: id }).populate({
            path: 'questions',
            model: 'Question',
            populate: {
                path: 'optionsList',
                model: 'Option',

            }
        }).exec();

        console.log(req.body.q1);
        item.title = req.body.title;
        item.description = req.body.description;

        //update question 1
        item.questions[0].question = req.body.q1;

        item.questions[0].optionsList[0].option = req.body.q1o1;
        item.questions[0].optionsList[1].option = req.body.q1o2;
        item.questions[0].optionsList[2].option = req.body.q1o3;
        item.questions[0].optionsList[3].option = req.body.q1o4;

        item.questions[0].optionsList[0].save();
        item.questions[0].optionsList[1].save();
        item.questions[0].optionsList[2].save();
        item.questions[0].optionsList[3].save();

        //update question 2
        item.questions[1].question = req.body.q2;
        item.questions[1].optionsList[0].option = req.body.q2o1;
        item.questions[1].optionsList[1].option = req.body.q2o2;
        item.questions[1].optionsList[2].option = req.body.q2o3;
        item.questions[1].optionsList[3].option = req.body.q2o4;

        item.questions[1].optionsList[0].save();
        item.questions[1].optionsList[1].save();
        item.questions[1].optionsList[2].save();
        item.questions[1].optionsList[3].save();

        //update question 3
        item.questions[2].question = req.body.q3;
        item.questions[2].optionsList[0].option = req.body.q3o1;
        item.questions[2].optionsList[1].option = req.body.q3o2;
        item.questions[2].optionsList[2].option = req.body.q3o3;
        item.questions[2].optionsList[3].option = req.body.q3o4;

        item.questions[2].optionsList[0].save();
        item.questions[2].optionsList[1].save();
        item.questions[2].optionsList[2].save();
        item.questions[2].optionsList[3].save();

        //update q4
        item.questions[3].question = req.body.q4;
        item.questions[3].optionsList[0].option = req.body.q4o1;
        item.questions[3].optionsList[1].option = req.body.q4o2;
        item.questions[3].optionsList[2].option = req.body.q4o3;
        item.questions[3].optionsList[3].option = req.body.q4o4;

        item.questions[3].optionsList[0].save();
        item.questions[3].optionsList[1].save();
        item.questions[3].optionsList[2].save();
        item.questions[3].optionsList[3].save();
        //update question 5
        item.questions[4].question = req.body.q5;
        item.questions[4].optionsList[0].option = req.body.q5o1;
        item.questions[4].optionsList[1].option = req.body.q5o2;
        item.questions[4].optionsList[2].option = req.body.q5o3;
        item.questions[4].optionsList[3].option = req.body.q5o4;

        item.questions[4].optionsList[0].save();
        item.questions[4].optionsList[1].save();
        item.questions[4].optionsList[2].save();
        item.questions[4].optionsList[3].save();


        item.questions[0].save();
        item.questions[1].save();
        item.questions[2].save();
        item.questions[3].save();
        item.questions[4].save();

        item.save();

        res.redirect('/survey');

    } catch (err) {
        console.error(err);
        res.end(err);
    }
}

export async function ProcessSurvey(req: Request, res: Response, next: NextFunction) {

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
            question: req.body.q5,
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

        res.redirect('/survey');
    } catch (err) {
        console.error(err);
        res.end(err);
    }


}


