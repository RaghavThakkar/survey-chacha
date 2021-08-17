import { Console } from 'console';
import express, { Request, Response, NextFunction } from 'express';
import mongodb = require('mongodb');
import Survey from '../Models/Survey';
import Option from '../Models/Option';
import moment from 'moment';
import Question from '../Models/questions';
import SurveyResponse from '../Models/SurveyResponse';
import { promises as fs } from 'fs';
//import Parser from "json2csv";
var chunk = require('lodash.chunk');
import passport from 'passport';

import User from '../Models/user';

import { UserDisplayName, userId, objectId } from '../Util';
import { Chart } from 'chart.js';

export async function DisplaySurvey(req: Request, res: Response, next: NextFunction) {

  try {

    //const surveyList = await Survey.find().lean().exec();
    const surveyList = await Survey.find(
      {
        "startDate": {
          $lte: new Date()
        },
        "endDate": {
          $gte: new Date(),
        }
      }).lean().exec();
    //const surveyList = await Survey.find().exec();
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
    res.render('survey/add', { title: 'Create Survey', page: 'index', displayName: UserDisplayName(req) });
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
    console.log(req.body['q1']);
    console.log(req.body['q2']);
    res.render('content/df', { title: 'Create Survey', page: 'index', displayName: UserDisplayName(req) });
  } catch (err) {
    console.error(err);
    res.end(err);
  }
}

export async function DisplayThankYou(req: Request, res: Response, next: NextFunction) {
  try {
    res.render('survey/thankyou', { title: 'Thank you', page: 'index', displayName: UserDisplayName(req) });
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




//survey response


export async function DisplaySurveyResponse(req: Request, res: Response, next: NextFunction) {
  try {
    let id = req.params.id;
    const responses = await SurveyResponse.find({ "survey": objectId(id) })
      .populate({
        path: 'ownerId',
        model: 'User',
      })
      .populate({
        path: 'survey',
        model: 'Survey',
        populate: {
          path: 'questions',
          model: 'Question',
          populate: {
            path: 'optionsList',
            model: 'Option',

          }
        }
      }).lean().exec();

    console.log(responses);
    res.render('surveyResponse/index', {
      title: 'list-survey',
      page: 'index',
      items: responses,
      id: id,
      displayName: UserDisplayName(req)
    });

  } catch (err) {
    console.error(err);
    res.end(err);
  }

}

export async function ExportSurveyResponse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let id = req.params.id;
    const responses = await SurveyResponse.find({ survey: objectId(id) })
      .populate(
        {
          path: 'survey',
          model: 'Survey',
          populate: {
            path: 'questions',
            model: 'Question',
            populate: {
              path: 'optionsList',
              model: 'Option',

            }
          }
        })
      .populate({
        path: 'ownerId',
        model: 'User',
      })
      .lean()
      .exec();
    //console.log("$$$$$$$$$$" + responses.survey.questions[0].question);
    makeCsvFile(responses, res);
  } catch (err) {
    console.error(err);
    res.end(err);
  }
}

const makeCsvFile = (data: any, res: any) => {


  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: './Client/Assets/csv/data.csv',
    header: [


      { id: 'q1', title: data[0].survey.questions[0].question },
      { id: 'q2', title: data[0].survey.questions[1].question },
      { id: 'q3', title: data[0].survey.questions[2].question },
      { id: 'q4', title: data[0].survey.questions[3].question },
      { id: 'q5', title: data[0].survey.questions[4].question },
    ],
  });



  const result = data.map((d: any) => {
    return {

      q1: d.questionValue[0],
      q2: d.questionValue[1],
      q3: d.questionValue[2],
      q4: d.questionValue[3],
      q5: d.questionValue[4],
    };
  });
  csvWriter
    .writeRecords(result) // returns a promise
    .then(() => {
      console.log(' Succefully export to csv');
      res.download('./Client/Assets/csv/data.csv');
    });
};




export async function DisplayAnalytics(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let id = req.params.id;
    const responses = await SurveyResponse.find({ survey: objectId(id) })
      .populate(
        {
          path: 'survey',
          model: 'Survey',
          populate: {
            path: 'questions',
            model: 'Question',
            populate: {
              path: 'optionsList',
              model: 'Option',

            }
          }
        })
      .populate({
        path: 'ownerId',
        model: 'User',
      })
      .lean()
      .exec();

    if (responses[0].survey.type === "1") {
      let finalData = [0, 0];

    } else {
      let finalData = [0, 0, 0, 0, 0];
    }

  } catch (err) {
    console.error(err);
    res.end(err);
  }
}

