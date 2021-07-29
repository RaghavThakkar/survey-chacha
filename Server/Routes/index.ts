// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

import mongoose from 'mongoose';

// define the book model


/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    page: 'home',
    books: ''
  });
});

router.get('/contact', (req, res, next) => {
  res.render('content/contact', {
    title: 'Home',
    page: 'home',
    books: ''
  });
});

router.get('/about', (req, res, next) => {
  res.render('content/about', {
    title: 'Home',
    page: 'home',
    books: ''
  });
});
//module.exports = router;
