import express, { Request, Response, NextFunction } from 'express';

import * as DBConfig from '../Config/db';
import mongodb = require("mongodb");

export function UserDisplayName(req: Request): string {
    if (req.user) {
        let user = req.user as UserDocument;
        return user.displayName.toString();
    }
    return '';
}

export function userId(req: Request): string {
    if (req.user) {
        let user = req.user as UserDocument;
        return user._id.toString();
    }
    return '';
}

export function AuthGuard(req: Request, res: Response, next: NextFunction): void {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

export function objectId(id: string): mongodb.ObjectID {
    const ObjectID = mongodb.ObjectID;
    return new ObjectID(id);
}