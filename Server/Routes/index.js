"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
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
//# sourceMappingURL=index.js.map