// modules required for routing
import express from 'express';

import {
  DisplaySurvey,
  CreateSurvey,

  DeleteSurvey,


  DisplayThankYou,
  DisplaySurveyResponse,
  ExportSurveyResponse,
  AnalyticsSurveyResponse


} from '../Controllers/surveyController';
import { AuthGuard } from '../Util';
const router = express.Router();
export default router;

/* GET home page. wildcard */
router.get('/', DisplaySurvey);
router.get('/thanks', DisplayThankYou);
router.get('/add', AuthGuard, CreateSurvey);

router.get('/delete/:id', AuthGuard, DeleteSurvey);

//router.get('/take/:id', TakeSurvey);
//router.post('/take/:id', ProcessTakeSurvey);

router.get('/response/:id', AuthGuard, DisplaySurveyResponse);
//router.post('/response/:id', AuthGuard, ProcessTakeSurvey);

//export
router.get('/response/export/:id', AuthGuard, ExportSurveyResponse);
router.get('/response/analytics/:id', AuthGuard, AnalyticsSurveyResponse);
