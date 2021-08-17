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




export async function ProcessTakeSurvey(req: Request, res: Response, next: NextFunction) {
  try {
    let id = req.params.id;
    const survey = await Survey.findOne({ _id: id }).exec();

    if (survey.isPublic && !req.isAuthenticated()) {
      res.redirect('/login');
      return
    }
    const surveyresponse = new SurveyResponse(
      {
        questionValue: [req.body.q1Radio, req.body.q2Radio, req.body.q3Radio, req.body.q4Radio, req.body.q5Radio],
        survey: survey,
        ownerId: req.user
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

export async function AnalyticsSurveyResponse(
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

    const result = responses.map((d: any) => {
      return {

        q1: d.questionValue[0],
        q2: d.questionValue[1],
        q3: d.questionValue[2],
        q4: d.questionValue[3],
        q5: d.questionValue[4],
      };
    });

    let options = [];
    let data = [0, 0,
      0, 0,
      0, 0,
      0, 0,
      0, 0];
    if (responses[0].survey.type === "1") {
      console.log("type 1");
      data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      for (let i = 0; i < result.length; i++) {
        if (result[i].q1 == 'True') {
          data[0]++;
        } else {
          data[1]++;
        }

        if (result[i].q2 == 'True') {
          data[2]++;
        } else {
          data[3]++;
        }

        if (result[i].q3 == 'True') {
          data[4]++;
        } else {
          data[5]++;
        }

        if (result[i].q4 == 'True') {
          data[6]++;
        } else {
          data[7]++;
        }

        if (result[i].q5 == 'True') {
          data[8]++;
        } else {
          data[9]++;
        }

      }
    } else {
      console.log("type 2");
      let length = 20;
      options = [];
      for (let i = 0; i < length; i++) {
        data.push(0);
        options.push("");
      }

      let currentIndex = 0;
      for (let i = 0; i < responses[0].survey.questions.length; i++) {
        for (let j = 0; j < responses[0].survey.questions[i].optionsList.length; j++) {
          options[currentIndex] = responses[0].survey.questions[i].optionsList[j].option;
          for (let z = 0; z < responses.length; z++) {
            if (options[currentIndex] === responses[z].questionValue[i]) {
              data[currentIndex]++;
            }
          }

          currentIndex++;
        }

      }

      console.log(options);
      console.log(data);



    }





    res.render('surveyResponse/analytics', {
      title: 'analytics',
      page: 'index',
      items: JSON.stringify(responses),
      id: id,
      data: data,
      options: options,
      type: responses[0].survey.type,
      questions: [responses[0].survey.questions[0].question,
      responses[0].survey.questions[1].question,
      responses[0].survey.questions[2].question,
      responses[0].survey.questions[3].question,
      responses[0].survey.questions[4].question],
      displayName: UserDisplayName(req),
    });
  } catch (err) {
    console.error(err);
    res.end(err);
  }
}