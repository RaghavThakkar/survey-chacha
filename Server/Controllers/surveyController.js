"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplaySurvey = void 0;
const Survey_1 = __importDefault(require("../Models/Survey"));
function DisplaySurvey(req, res, next) {
    Survey_1.default.find({}, null, { sort: { Price: 1 } }, function (err, surveyList) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('survey/index', { title: 'list-survey', page: 'index', items: surveyList });
    });
}
exports.DisplaySurvey = DisplaySurvey;
//# sourceMappingURL=surveyController.js.map