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
exports.ProcessSurvey = exports.ProcessEditSurvey = exports.EditSurvey = exports.DeleteSurvey = exports.ProcessTakeSurvey = exports.TakeSurvey = exports.DisplayThankYou = exports.CreateSurvey = exports.DisplaySurvey = void 0;
const Survey_1 = __importDefault(require("../Models/Survey"));
const Option_1 = __importDefault(require("../Models/Option"));
const questions_1 = __importDefault(require("../Models/questions"));
const SurveyResponse_1 = __importDefault(require("../Models/SurveyResponse"));
function DisplaySurvey(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const surveyList = yield Survey_1.default.find().lean().exec();
            const surveyResponse = yield SurveyResponse_1.default.count().exec();
            console.log(surveyList);
            res.render('survey/index', {
                title: 'list-survey',
                page: 'index',
                items: surveyList,
                responseCount: surveyResponse
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
            res.render('survey/add', { title: 'Create Survey', page: 'index' });
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.CreateSurvey = CreateSurvey;
function DisplayThankYou(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.render('survey/thankyou', { title: 'Thank you', page: 'index' });
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
            res.render('survey/take', {
                title: 'Take Survey',
                page: 'index',
                data: item
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
            const surveyresponse = new SurveyResponse_1.default({
                questionValue: [req.body.q1Radio, req.body.q2Radio, req.body.q3Radio, req.body.q4Radio, req.body.q5Radio],
                survey: survey,
                ownerId: 0
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
            res.render('survey/edit', {
                title: 'Edit Survey',
                page: 'index',
                data: item
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
            console.log(req.body.q1);
            item.title = req.body.title;
            item.description = req.body.description;
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
            console.log(req);
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
                active: true,
                userId: 0,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate),
                title: req.body.title,
                description: req.body.description,
            });
            const newSurevy = yield Survey_1.default.create(survey);
            res.redirect('/survey');
        }
        catch (err) {
            console.error(err);
            res.end(err);
        }
    });
}
exports.ProcessSurvey = ProcessSurvey;
//# sourceMappingURL=surveyController.js.map