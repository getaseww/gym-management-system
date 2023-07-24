import UserService from '../services/user.service';
import bcrypt from 'bcrypt';
import passportJwt from 'passport-jwt';
import {Strategy} from 'passport-local';
import { User } from '../type';


// export const GoogleStrategy = require('passport-google-oauth20').Strategy;

const security = {
    saltRound: 10,
    secret: "secret_key",
    token_expiration: 60 * 60 * 24 * 30,
};

export const localStrategy = new Strategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    (email:string, password:string, done:Function) => {
        UserService.findOne({ email })
            .then((user:any) => {
                if (!user) {
                    return done(null, false, {
                        message: "Login Failed: Invalid Email or password!",
                    });
                } else {
                    bcrypt.compare(
                        password,
                        `${user.password}`,
                        (error, isMatch) => {
                            if (error) {
                                return done(null, false, error);
                            } else if (!isMatch) {
                                return done(null, false, {
                                    message: "Login Failed: Invalid Email or password!",
                                });
                            } else {
                                return done(null, user);
                            }
                        }
                    );
                }
            })
            .catch((error) => {
                done(error);
            });
    }
);

export const jwtStrategy = new passportJwt.Strategy(
    {
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.TOKEN_KEY,
        ignoreExpiration:true,
    },
    (jwtPayload, next) => {
        UserService.findOne({ id: jwtPayload.id })
            .then((user) => {
                if (user) {
                    next(null, user);
                } else {
                    next(null, false);
                }
            })
            .catch((error) => {
                return next(error, false);
            });
    }
);

// export const googleStrategy= new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/api/user/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     // Callback function when user successfully signs in with Google
//     // You can perform actions like creating/updating user in your database
//     // and then call the `done` function to proceed with authentication.
//     // In this example, we simply pass the `profile` to the `done` function.
//     return done(null, profile);
//   }
// );



