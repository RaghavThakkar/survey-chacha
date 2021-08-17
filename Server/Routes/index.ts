import express from 'express';
const router = express.Router();
export default router;

import mongoose from 'mongoose';

// define the book model
import { DisplayAboutPage, DisplayContactPage, DisplayHomePage, DisplayLoginPage, DisplayRegisterPage, ProcessContactPage, ProcessLoginPage, ProcessLogoutPage, ProcessRegisterPage } from '../Controllers/index'

//

/* GET home page. wildcard */
router.get('/', DisplayHomePage);

router.get('/contact', DisplayContactPage);
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
