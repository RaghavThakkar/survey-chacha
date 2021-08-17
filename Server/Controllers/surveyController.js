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
exports.DisplayAnalytics = exports.ExportSurveyResponse = exports.DisplaySurveyResponse = exports.ProcessEditSurvey = exports.EditSurvey = exports.DeleteSurvey = exports.DisplayThankYou = exports.ProcessDF = exports.DF = exports.CreateSurvey = exports.DisplaySurvey = void 0;
const Survey_1 = __importDefault(require("../Models/Survey"));
const moment_1 = __importDefault(require("moment"));
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
//# sourceMappingURL=surveyController.js.map