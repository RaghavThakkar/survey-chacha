// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

import mongoose from 'mongoose';

// define the book model
import { DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayLoginPage, DisplayRegisterPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage } from '../Controllers/index'
import { DF, ProcessDF } from '../Controllers/surveyController';


/* GET home page. wildcard */
router.get('/', DisplayHomePage);

router.get('/contact', DisplayContactPage);

router.get('/about', DisplayAboutPage);
//module.exports = router;

/* GET login page. */
router.get('/login', DisplayLoginPage);
router.get('/df', DF);
router.post('/df', ProcessDF);
/* Post login page. */
router.post('/login', ProcessLoginPage);

/* GET login page. */
router.get('/register', DisplayRegisterPage);

/* Post register page. */
router.post('/register', ProcessRegisterPage);


/* Post register page. */
router.get('/logout', ProcessLogoutPage);