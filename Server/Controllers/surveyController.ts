import { Console } from 'console';
import express, { Request, Response, NextFunction } from 'express';

import Survey from '../Models/Survey';
import Option from '../Models/Option';
import Question from '../Models/questions';


export function DisplaySurvey(req: Request, res: Response, next: NextFunction): void {


    Survey.find({}, null, { sort: { Price: 1 } }, function (err, surveyList) {
        if (err) {
            console.error(err);
            res.end(err);
        }

        res.render('survey/index', { title: 'list-survey', page: 'index', items: surveyList });

    });

}
