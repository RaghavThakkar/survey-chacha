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
exports.AnalyticsSurveyResponse = exports.DisplayAnalytics = exports.ExportSurveyResponse = exports.DisplaySurveyResponse = exports.DeleteSurvey = exports.ProcessTakeSurvey = exports.TakeSurvey = exports.DisplayThankYou = exports.ProcessDF = exports.DF = exports.CreateSurvey = exports.DisplaySurvey = void 0;
const Survey_1 = __importDefault(require("../Models/Survey"));
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
            if (!(item.isPublic && !req.isAuthenticated())) {
                res.render('survey/take', {
                    title: 'Take Survey',
                    page: 'index',
                    data: item,
                    displayName: Util_1.UserDisplayName(req)
                });
            }
            else {
                res.redirect('/login');
                return;
            }
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