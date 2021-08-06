"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectId = exports.AuthGuard = exports.userId = exports.UserDisplayName = void 0;
const mongodb = require("mongodb");
function UserDisplayName(req) {
    if (req.user) {
        let user = req.user;
        return user.displayName.toString();
    }
    return '';
}
exports.UserDisplayName = UserDisplayName;
function userId(req) {
    if (req.user) {
        let user = req.user;
        return user._id.toString();
    }
    return '';
}
exports.userId = userId;
function AuthGuard(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
exports.AuthGuard = AuthGuard;
function objectId(id) {
    const ObjectID = mongodb.ObjectID;
    return new ObjectID(id);
}
exports.objectId = objectId;
//# sourceMappingURL=index.js.map