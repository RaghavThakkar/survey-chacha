import express, { Request, Response, NextFunction } from 'express';

import * as DBConfig from '../Config/db';

export function UserDisplayName(req: Request): string {
    if (req.user) {
        let user = req.user as UserDocument;
        return user.displayName.toString();
    }
    return '';
}

export function AuthGuard(req: Request, res: Response, next: NextFunction): void {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
