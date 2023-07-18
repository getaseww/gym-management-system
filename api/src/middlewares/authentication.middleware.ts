import jwt from 'jsonwebtoken';
import passport from 'passport';
import {prisma} from '../config/db'
import { Request, Response } from "express";
import passportConfig from '../passport/passport.config';
import {NotAuthenticatedError} from '../errors/errors';

const authentication = (req:Request, res:Response, next) => {
    if (!req.body.email) {
        return res.status(400).json({
            message: "email is required!",
        });
    }
    if (!req.body.password) {
        return res.status(400).json({
            message: "Password required!",
        });
    }

    passport.authenticate('local', { session: false }, (error, user, info) => {
        console.log("ERROR >>>  ", error);
        if (error) {
            return res.status(500).send(error);
        } else if (!user) {
            return res
                .status(401)
                .json({ message: "Login Failed: Invalid Username or password!" });
        } else {
            req.logIn(user, { session: false }, (error) => {
                console.log("ER >>>  ", error);
                if (error) {
                    return res
                        .status(401)
                        .json({ message: "Login Failed: Invalid Username or password!" });
                } else {
                    console.log("success", user)
                    req.user = user;
                    console.log(req);
                }
                next();
            });
        }
    })(req, res, next);
};

const response = (req, res) => {
    let user = req.user;
    res.status(200).json({
        token: req.token,
        fullNname: user.fullName,
        userName: user.userName,
        email: user.email,
        roleId: user.roleId,
        id: user.id,
        mobileNumber: user.mobileNumber,
        isVerified: user.isVerified,
    });
};


const authenticateHeader = (
    req,
    res,
    next
) => {
    const authentication_header = req.headers.authorization;
    const token = authentication_header && authentication_header.split(" ")[1];
    if (token == null) return res.status(401).json("Unauthorized!");

    jwt.verify(
        token,
        process.env.TOKEN_KEY,
        (error, user) => {
            if (error) {
                return res.status(403).json("Forbiden!");
            }
            req.user = user;
            next();
        }
    );
};


const protect = async (req, res, next) => {
    let token
    let decoded
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1]
            // Verify token
            decoded = jwt.verify(token, process.env.TOKEN_KEY)
            // Get user from the token
            req.user = await prisma.user.findFirst({ where: { id: decoded.id } })
            next()
        } catch (error) {
            res.status(401).json({
                message: "User is not authenticated.",
            })
        }
    }

    if (!token) {
        res.status(401).json({
            message: "Not authorized, no token"
        })
    }
}

const generateToken = (req, res, next) => {
    console.log("from req body", req.user)
    let user = req.user;
    req.token = jwt.sign(
        {
            id: user.id,
            fullName: user.fullName,
        },
        process.env.TOKEN_KEY
    );

    next();
};



const auth = {
    authentication,
    authenticateHeader,
    generateToken,
    protect,
    response,
}

module.exports = auth