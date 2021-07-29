"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const surveyController_1 = require("../Controllers/surveyController");
const router = express_1.default.Router();
exports.default = router;
router.get('/', surveyController_1.DisplaySurvey);
router.get('/thanks', surveyController_1.DisplayThankYou);
router.get('/add', surveyController_1.CreateSurvey);
router.post('/add', surveyController_1.ProcessSurvey);
router.get('/delete/:id', surveyController_1.DeleteSurvey);
router.get('/edit/:id', surveyController_1.EditSurvey);
router.post('/edit/:id', surveyController_1.ProcessEditSurvey);
router.get('/take/:id', surveyController_1.TakeSurvey);
router.post('/take/:id', surveyController_1.ProcessTakeSurvey);
//# sourceMappingURL=surveyRoute.js.map