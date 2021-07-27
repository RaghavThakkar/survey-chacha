// modules required for routing
import express from 'express';

import { DisplaySurvey, CreateSurvey, ProcessSurvey, DeleteSurvey, TakeSurvey, ProcessTakeSurvey, DisplayThankYou } from '../Controllers/surveyController';

const router = express.Router();
export default router;

/* GET home page. wildcard */
router.get('/', DisplaySurvey);
router.get('/thanks', DisplayThankYou);
router.get('/add', CreateSurvey);
router.post('/add', ProcessSurvey);
router.get('/delete/:id', DeleteSurvey);
router.get('/take/:id', TakeSurvey);
router.post('/take/:id', ProcessTakeSurvey);


