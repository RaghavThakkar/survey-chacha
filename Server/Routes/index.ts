import express from 'express';
const router = express.Router();
export default router;

//database
import mongoose from 'mongoose';

// define the book model
import { DisplayContactPage, DisplayAboutPage, DisplayHomePage, DisplayLoginPage, DisplayRegisterPage, ProcessContactPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage } from '../Controllers/index'

//

//contact page
router.get('/contact', DisplayContactPage);
/* GET home page. wildcard */
router.get('/', DisplayHomePage);


//process contact page
router.post('/contact', ProcessContactPage);
router.get('/about', DisplayAboutPage);
//module.exports = router;

/* GET login page. */
router.get('/login', DisplayLoginPage);

/* Post login page. */
router.post('/login', ProcessLoginPage);

/* GET login page. */
router.get('/register', DisplayRegisterPage);

/* Post register page. */
router.post('/register', ProcessRegisterPage);


/* Post register page. */
router.get('/logout', ProcessLogoutPage);
