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
exports.AnalyticsSurveyResponse = exports.DisplayAnalytics = exports.ExportSurveyResponse = exports.DisplaySurveyResponse = exports.ProcessSurvey = exports.ProcessEditSurvey = exports.EditSurvey = exports.DeleteSurvey = exports.ProcessTakeSurvey = exports.TakeSurvey = exports.DisplayThankYou = exports.ProcessDF = exports.DF = exports.CreateSurvey = exports.DisplaySurvey = void 0;
const Survey_1 = __importDefault(require("../Models/Survey"));
const Option_1 = __importDefault(require("../Models/Option"));
const moment_1 = __importDefault(require("moment"));
const questions_1 = __importDefault(require("../Models/questions"));
const SurveyResponse_1 = __importDefault(require("../Models/SurveyResponse"));
var chunk = require('lodash.chunk');
const Util_1 = require("../Util");
function DisplaySurvey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const surveyList = yield Survey_1.default.find({
                "startDate": {
                    $lte: new Date()
                },
                "endDate": {
                    $gte: new Date(),
                }
            }).lean().exec();
            const surveyResponse = yield SurveyResponse_1.default.count().exec();
            console.log(surveyList);
            res.render('survey/index', {
                title: 'list-survey',
                page: 'index',
                items: surveyList,
                responseCount: surveyResponse,
                displayName: Util_1.UserDisplayName(req)
            });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplaySurvey = DisplaySurvey;
function CreateSurvey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.render('survey/add', { title: 'Create Survey', page: 'index', displayName: Util_1.UserDisplayName(req) });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.CreateSurvey = CreateSurvey;
function DF(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.render('content/df', { title: 'Create Survey', page: 'index', displayName: Util_1.UserDisplayName(req) });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DF = DF;
function ProcessDF(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            console.log(req.body['q1']);
            console.log(req.body['q2']);
            res.render('content/df', { title: 'Create Survey', page: 'index', displayName: Util_1.UserDisplayName(req) });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessDF = ProcessDF;
function DisplayThankYou(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.render('survey/thankyou', { title: 'Thank you', page: 'index', displayName: Util_1.UserDisplayName(req) });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplayThankYou = DisplayThankYou;
function TakeSurvey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const item = yield Survey_1.default.findOne({ _id: id }).populate({
                path: 'questions',
                model: 'Question',
                populate: {
                    path: 'optionsList',
                    model: 'Option',
                }
            }).exec();
            if (item.isPublic && !req.isAuthenticated()) {
                res.redirect('/login');
                return;
            }
            res.render('survey/take', {
                title: 'Take Survey',
                page: 'index',
                data: item,
                displayName: Util_1.UserDisplayName(req)
            });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.TakeSurvey = TakeSurvey;
function ProcessTakeSurvey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const survey = yield Survey_1.default.findOne({ _id: id }).exec();
            if (survey.isPublic && !req.isAuthenticated()) {
                res.redirect('/login');
                return;
            }
            const surveyresponse = new SurveyResponse_1.default({
                questionValue: [req.body.q1Radio, req.body.q2Radio, req.body.q3Radio, req.body.q4Radio, req.body.q5Radio],
                survey: survey,
                ownerId: req.user
            });
            const q1o1 = yield SurveyResponse_1.default.create(surveyresponse);
            res.redirect('/survey/thanks');
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessTakeSurvey = ProcessTakeSurvey;
function DeleteSurvey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const survey = yield Survey_1.default.findOne({ _id: id }).exec();
            console.log(survey);
            yield Survey_1.default.remove({ _id: id }).exec();
            res.redirect('/survey');
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DeleteSurvey = DeleteSurvey;
function EditSurvey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const item = yield Survey_1.default.findOne({ _id: id }).populate({
                path: 'questions',
                model: 'Question',
                populate: {
                    path: 'optionsList',
                    model: 'Option',
                }
            }).exec();
            let startDate = moment_1.default(item.startDate).format("yyyy-MM-DD");
            let endDate = moment_1.default(item.endDate).format("yyyy-MM-DD");
            res.render('survey/edit', {
                title: 'Edit Survey',
                page: 'index',
                data: item,
                displayName: Util_1.UserDisplayName(req),
                startDate: startDate,
                endDate: endDate
            });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.EditSurvey = EditSurvey;
function ProcessEditSurvey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            let item = yield Survey_1.default.findOne({ _id: id }).populate({
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
            }
            else {
                item.questions[0].question = req.body.q1;
                item.questions[0].optionsList[0].option = req.body.q1o1;
                item.questions[0].optionsList[1].option = req.body.q1o2;
                item.questions[0].optionsList[2].option = req.body.q1o3;
                item.questions[0].optionsList[3].option = req.body.q1o4;
                item.questions[0].optionsList[0].save();
                item.questions[0].optionsList[1].save();
                item.questions[0].optionsList[2].save();
                item.questions[0].optionsList[3].save();
                item.questions[1].question = req.body.q2;
                item.questions[1].optionsList[0].option = req.body.q2o1;
                item.questions[1].optionsList[1].option = req.body.q2o2;
                item.questions[1].optionsList[2].option = req.body.q2o3;
                item.questions[1].optionsList[3].option = req.body.q2o4;
                item.questions[1].optionsList[0].save();
                item.questions[1].optionsList[1].save();
                item.questions[1].optionsList[2].save();
                item.questions[1].optionsList[3].save();
                item.questions[2].question = req.body.q3;
                item.questions[2].optionsList[0].option = req.body.q3o1;
                item.questions[2].optionsList[1].option = req.body.q3o2;
                item.questions[2].optionsList[2].option = req.body.q3o3;
                item.questions[2].optionsList[3].option = req.body.q3o4;
                item.questions[2].optionsList[0].save();
                item.questions[2].optionsList[1].save();
                item.questions[2].optionsList[2].save();
                item.questions[2].optionsList[3].save();
                item.questions[3].question = req.body.q4;
                item.questions[3].optionsList[0].option = req.body.q4o1;
                item.questions[3].optionsList[1].option = req.body.q4o2;
                item.questions[3].optionsList[2].option = req.body.q4o3;
                item.questions[3].optionsList[3].option = req.body.q4o4;
                item.questions[3].optionsList[0].save();
                item.questions[3].optionsList[1].save();
                item.questions[3].optionsList[2].save();
                item.questions[3].optionsList[3].save();
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
            item.questions[0].save();
            item.questions[1].save();
            item.questions[2].save();
            item.questions[3].save();
            item.questions[4].save();
            item.save();
            res.redirect('/survey');
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessEditSurvey = ProcessEditSurvey;
function ProcessSurvey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let requiredLoginValue = req.body['requiredLogin'];
            let requiredLogin = true;
            if (requiredLoginValue) {
                requiredLogin = true;
            }
            else {
                requiredLogin = false;
            }
            let activeValue = req.body['active'];
            let active = true;
            if (activeValue) {
                active = true;
            }
            else {
                active = false;
            }
            if (req.body.inlineRadioOptions === "option1") {
                const q1o1 = yield Option_1.default.create(new Option_1.default({ option: 'True' }));
                const q1o2 = yield Option_1.default.create(new Option_1.default({ option: 'False' }));
                const q2o1 = yield Option_1.default.create(new Option_1.default({ option: 'True' }));
                const q2o2 = yield Option_1.default.create(new Option_1.default({ option: 'False' }));
                const q3o1 = yield Option_1.default.create(new Option_1.default({ option: 'True' }));
                const q3o2 = yield Option_1.default.create(new Option_1.default({ option: 'False' }));
                const q4o1 = yield Option_1.default.create(new Option_1.default({ option: 'True' }));
                const q4o2 = yield Option_1.default.create(new Option_1.default({ option: 'False' }));
                const q5o1 = yield Option_1.default.create(new Option_1.default({ option: 'True' }));
                const q5o2 = yield Option_1.default.create(new Option_1.default({ option: 'False' }));
                const q1 = new questions_1.default({
                    question: req.body.q1,
                    optionsList: [q1o1, q1o2],
                    type: "1"
                });
                const q2 = new questions_1.default({
                    question: req.body.q2,
                    optionsList: [q2o1, q2o2],
                    type: "1"
                });
                const q3 = new questions_1.default({
                    question: req.body.q3,
                    optionsList: [q3o1, q3o2],
                    type: "1"
                });
                const q4 = new questions_1.default({
                    question: req.body.q4,
                    optionsList: [q4o1, q4o2],
                    type: "1"
                });
                const q5 = new questions_1.default({
                    question: req.body.q5,
                    optionsList: [q5o1, q5o2],
                    type: "1"
                });
                const newQ1 = yield questions_1.default.create(q1);
                const newQ2 = yield questions_1.default.create(q2);
                const newQ3 = yield questions_1.default.create(q3);
                const newQ4 = yield questions_1.default.create(q4);
                const newQ5 = yield questions_1.default.create(q5);
                const survey = new Survey_1.default({
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
                const newSurevy = yield Survey_1.default.create(survey);
            }
            else {
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
                    question: req.body.q5,
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
                    active: active,
                    userId: req.user,
                    type: '2',
                    isPublic: requiredLogin,
                    startDate: new Date(req.body.startDate),
                    endDate: new Date(req.body.endDate),
                    title: req.body.title,
                    description: req.body.description,
                });
                const newSurevy = yield Survey_1.default.create(survey);
            }
            res.redirect('/survey');
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessSurvey = ProcessSurvey;
function DisplaySurveyResponse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const responses = yield SurveyResponse_1.default.find({ "survey": Util_1.objectId(id) })
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
                displayName: Util_1.UserDisplayName(req)
            });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplaySurveyResponse = DisplaySurveyResponse;
function ExportSurveyResponse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const responses = yield SurveyResponse_1.default.find({ survey: Util_1.objectId(id) })
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
            })
                .populate({
                path: 'ownerId',
                model: 'User',
            })
                .lean()
                .exec();
            makeCsvFile(responses, res);
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ExportSurveyResponse = ExportSurveyResponse;
const makeCsvFile = (data, res) => {
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
    const result = data.map((d) => {
        return {
            q1: d.questionValue[0],
            q2: d.questionValue[1],
            q3: d.questionValue[2],
            q4: d.questionValue[3],
            q5: d.questionValue[4],
        };
    });
    csvWriter
        .writeRecords(result)
        .then(() => {
        console.log(' Succefully export to csv');
        res.download('./Client/Assets/csv/data.csv');
    });
};
function DisplayAnalytics(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const responses = yield SurveyResponse_1.default.find({ survey: Util_1.objectId(id) })
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
            })
                .populate({
                path: 'ownerId',
                model: 'User',
            })
                .lean()
                .exec();
            if (responses[0].survey.type === "1") {
                let finalData = [0, 0];
            }
            else {
                let finalData = [0, 0, 0, 0, 0];
            }
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.DisplayAnalytics = DisplayAnalytics;
function AnalyticsSurveyResponse(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let id = req.params.id;
            const responses = yield SurveyResponse_1.default.find({ survey: Util_1.objectId(id) })
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
            })
                .populate({
                path: 'ownerId',
                model: 'User',
            })
                .lean()
                .exec();
            const result = responses.map((d) => {
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
                    }
                    else {
                        data[1]++;
                    }
                    if (result[i].q2 == 'True') {
                        data[2]++;
                    }
                    else {
                        data[3]++;
                    }
                    if (result[i].q3 == 'True') {
                        data[4]++;
                    }
                    else {
                        data[5]++;
                    }
                    if (result[i].q4 == 'True') {
                        data[6]++;
                    }
                    else {
                        data[7]++;
                    }
                    if (result[i].q5 == 'True') {
                        data[8]++;
                    }
                    else {
                        data[9]++;
                    }
                }
            }
            else {
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
                displayName: Util_1.UserDisplayName(req),
            });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.AnalyticsSurveyResponse = AnalyticsSurveyResponse;
//# sourceMappingURL=surveyController.js.map