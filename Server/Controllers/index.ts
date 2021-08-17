import express, { Request, Response, NextFunction } from 'express';

import passport from 'passport';

import User from '../Models/user';

import Contact from '../Models/contact';

import { UserDisplayName } from '../Util';

//


export function DisplayAboutPage(req: Request, res: Response, next: NextFunction): void {
    res.render('content/about', { title: 'About Us', page: 'about', displayName: UserDisplayName(req) });
}

export function DisplayHomePage(req: Request, res: Response, next: NextFunction): void {
    res.render('content/index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
}

export function DisplayProjectPage(req: Request, res: Response, next: NextFunction): void {
    res.render('index', { title: 'Our Projects', page: 'projects', displayName: UserDisplayName(req) });
}

export function DisplayContactPage(req: Request, res: Response, next: NextFunction): void {
    res.render('content/contact', { title: 'Contact Us', page: 'contact', displayName: UserDisplayName(req) });
}

export function DisplayServicesPage(req: Request, res: Response, next: NextFunction): void {
    res.render('index', { title: 'Our Services', page: 'services', displayName: UserDisplayName(req) });
}

export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void {

    if (!req.user) {
        return res.render('content/login', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }

    return res.redirect('/survey');

}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate('local', (err, user, info) => {
        // are there server errors?
        if (err) {
            console.error(err);
            return next(err);
        }

        // are there login errors?
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.login(user, (err) =>
        // are there db errors?
        {
            if (err) {
                console.error(err);
                return next(err);
            }

            return res.redirect('/survey');

        });
    })(req, res, next);
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void {

    if (!req.user) {
        return res.render('content/register', { title: 'Register', page: 'register', messages: "", displayName: UserDisplayName(req) });
    }



    return res.redirect('/contact-list');
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void {
    // instantiate a new User Object
    let newUser = new User
        ({
            username: req.body.username,
            emailAddress: req.body.emailAddress,
            displayName: req.body.FirstName + " " + req.body.LastName
        });

    // @ts-ignore
    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.error('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');

            return res.redirect('/register');
        }

        // after successful registration - login the user
        return passport.authenticate('local')(req, res, () => {
            return res.redirect('/survey');
        });
    });
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void {
    req.logOut();
    res.redirect('/login');
}

export function ProcessContactPage(req: Request, res: Response, next: NextFunction): void {
    // instantiate a new Contact Object
    let newContact = new Contact
        ({
            fullName: req.body.fullName,
            email: req.body.emailAddress,
            phone: req.body.phone,
            message: req.body.message
        });

    Contact.create(newContact, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        return res.redirect('/survey/thanks');
    });
}
