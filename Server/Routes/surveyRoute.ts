// modules required for routing
import express from 'express';
import { DisplaySurvey } from '../Controllers/surveyController';

const router = express.Router();
export default router;

/* GET home page. wildcard */
router.get('/', DisplaySurvey);