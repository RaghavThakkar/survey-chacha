"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const surveyController_1 = require("../Controllers/surveyController");
const Util_1 = require("../Util");
const router = express_1.default.Router();
exports.default = router;
router.get('/', surveyController_1.DisplaySurvey);
router.get('/thanks', surveyController_1.DisplayThankYou);
router.get('/add', Util_1.AuthGuard, surveyController_1.CreateSurvey);
router.get('/delete/:id', Util_1.AuthGuard, surveyController_1.DeleteSurvey);
router.get('/response/:id', Util_1.AuthGuard, surveyController_1.DisplaySurveyResponse);
router.get('/response/export/:id', Util_1.AuthGuard, surveyController_1.ExportSurveyResponse);
router.get('/response/analytics/:id', Util_1.AuthGuard, surveyController_1.AnalyticsSurveyResponse);
//# sourceMappingURL=surveyRoute.js.map