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
router.get('/', Util_1.AuthGuard, surveyController_1.DisplaySurvey);
router.get('/thanks', Util_1.AuthGuard, surveyController_1.DisplayThankYou);
router.get('/add', Util_1.AuthGuard, surveyController_1.CreateSurvey);
router.post('/add', Util_1.AuthGuard, surveyController_1.ProcessSurvey);
router.get('/delete/:id', Util_1.AuthGuard, surveyController_1.DeleteSurvey);
router.get('/edit/:id', Util_1.AuthGuard, surveyController_1.EditSurvey);
router.post('/edit/:id', Util_1.AuthGuard, surveyController_1.ProcessEditSurvey);
router.get('/take/:id', Util_1.AuthGuard, surveyController_1.TakeSurvey);
router.post('/take/:id', Util_1.AuthGuard, surveyController_1.ProcessTakeSurvey);
router.get('/response/:id', Util_1.AuthGuard, surveyController_1.DisplaySurveyResponse);
router.post('/response/:id', Util_1.AuthGuard, surveyController_1.ProcessTakeSurvey);
router.get('/response/:id', Util_1.AuthGuard, surveyController_1.DisplaySurveyResponse);
//# sourceMappingURL=surveyRoute.js.map