// modules required for routing
import express from 'express';

import {
  DisplaySurvey,
  CreateSurvey,

  DeleteSurvey,
  TakeSurvey,
  ProcessTakeSurvey,
  ProcessSurvey,
  DisplayThankYou,
  EditSurvey,
  ProcessEditSurvey,
  DisplaySurveyResponse,
  ExportSurveyResponse,


} from '../Controllers/surveyController';
import { AuthGuard } from '../Util';
const router = express.Router();
export default router;

/* GET home page. wildcard */
router.get('/', DisplaySurvey);
router.get('/thanks', DisplayThankYou);
router.get('/add', AuthGuard, CreateSurvey);
router.post('/add', AuthGuard, ProcessSurvey);
router.get('/delete/:id', AuthGuard, DeleteSurvey);
router.get('/edit/:id', AuthGuard, EditSurvey);
router.post('/edit/:id', AuthGuard, ProcessEditSurvey);
router.get('/take/:id', TakeSurvey);
router.post('/take/:id', ProcessTakeSurvey);

router.get('/response/:id', AuthGuard, DisplaySurveyResponse);
//router.post('/response/:id', AuthGuard, ProcessTakeSurvey);

//export
router.get('/response/export/:id', AuthGuard, ExportSurveyResponse);
//router.get('/response/analytics/:id', AuthGuard, AnalyticsSurveyResponse);
