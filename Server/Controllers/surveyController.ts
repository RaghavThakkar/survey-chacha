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

    if (!(item.isPublic && !req.isAuthenticated())) {
      res.render('survey/take',
          {
            title: 'Take Survey',
            page: 'index',
            data: item,
            displayName: UserDisplayName(req)
          });
    } else {
      res.redirect('/login');
      return
    }
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
    let startDate = moment(item.startDate).format("yyyy-MM-DD");
    let endDate = moment(item.endDate).format("yyyy-MM-DD");
    res.render('survey/edit',
      {
        title: 'Edit Survey',
        page: 'index',
        data: item,
        displayName: UserDisplayName(req),
        startDate: startDate,
        endDate: endDate
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

    item.title = req.body.title;
    item.description = req.body.description;
    console.log("Start Date " + new Date(req.body.startDate));
    item.startDate = new Date(req.body.startDate);
    item.endDate = new Date(req.body.endDate);

    if (item.type === "1") {
      item.questions[0].question = req.body.q1;
      item.questions[1].question = req.body.q2;
      item.questions[2].question = req.body.q3;
      item.questions[3].question = req.body.q4;
      item.questions[4].question = req.body.q5;
    } else {
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
    }


    //update question 1

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


    let requiredLoginValue = req.body['requiredLogin']; // This will have one of two values, 'undefined' if it wasn't checked, or 'on' if it is checked

    let requiredLogin = true;

    if (requiredLoginValue) {
      requiredLogin = true;
    } else {
      requiredLogin = false;
    }

    let activeValue = req.body['active']; // This will have one of two values, 'undefined' if it wasn't checked, or 'on' if it is checked

    let active = true;

    if (activeValue) {
      active = true;
    } else {
      active = false;
    }

    if (req.body.inlineRadioOptions === "option1") {

      const q1o1 = await Option.create(new Option({ option: 'True' }));
      const q1o2 = await Option.create(new Option({ option: 'False' }));

      const q2o1 = await Option.create(new Option({ option: 'True' }));
      const q2o2 = await Option.create(new Option({ option: 'False' }));

      const q3o1 = await Option.create(new Option({ option: 'True' }));
      const q3o2 = await Option.create(new Option({ option: 'False' }));

      const q4o1 = await Option.create(new Option({ option: 'True' }));
      const q4o2 = await Option.create(new Option({ option: 'False' }));

      const q5o1 = await Option.create(new Option({ option: 'True' }));
      const q5o2 = await Option.create(new Option({ option: 'False' }));

      const q1 = new Question({
        question: req.body.q1,
        optionsList: [q1o1, q1o2],
        type: "1"
      });

      const q2 = new Question({
        question: req.body.q2,
        optionsList: [q2o1, q2o2],
        type: "1"
      });

      const q3 = new Question({
        question: req.body.q3,
        optionsList: [q3o1, q3o2],
        type: "1"
      });

      const q4 = new Question({
        question: req.body.q4,
        optionsList: [q4o1, q4o2],
        type: "1"
      });

      const q5 = new Question({
        question: req.body.q5,
        optionsList: [q5o1, q5o2],
        type: "1"
      });



      const newQ1 = await Question.create(q1);
      const newQ2 = await Question.create(q2);
      const newQ3 = await Question.create(q3);
      const newQ4 = await Question.create(q4);
      const newQ5 = await Question.create(q5);

      const survey = new Survey({
        questions: [newQ1, newQ2, newQ3, newQ4, newQ5],
        active: active,
        userId: req.user,
        type: "1",
        isPublic: requiredLogin,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        title: req.body.title,
        description: req.body.description,
      });
      const newSurevy = await Survey.create(survey);
    } else {

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
        active: active,
        userId: req.user,
        type: '2',
        isPublic: requiredLogin,
        startDate: new Date(req.body.startDate),
        endDate: new Date(req.body.endDate),
        title: req.body.title,
        description: req.body.description,
      });
      const newSurevy = await Survey.create(survey);
    }



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
    let data = [0, 0,
      0, 0,
      0, 0,
      0, 0,
      0, 0];
    if (responses[0].survey.type === "1") {
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
      data = [0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0];
    }





    res.render('surveyResponse/analytics', {
      title: 'analytics',
      page: 'index',
      items: JSON.stringify(responses),
      id: id,
      data: data,
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