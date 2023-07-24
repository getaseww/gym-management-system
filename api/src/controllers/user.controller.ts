import { Request, Response } from "express";
import UserService from "../services/user.service";
import { User, Error } from "../type";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'

class UserController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            firstName: z.string(),
            lastName: z.string(),
            sex: z.string(),
            email: z.string().email(),
            phoneNumber: z.string().min(10).max(10),
            password: z.string(),
            roleId: z.string()
        })

        const data = request.body;
        try {
            schema.parseAsync(data)
            UserService.create(data)
                .then((result: User) => {
                    const {password,...data}=result;
                    response.status(200).json(data);
                })
                .catch((error: Error) => {
                    response.status(error.statusCode).json(error.message);
                });
        } catch (error) {
            let err = new BadRequestError(JSON.stringify(error));
            response.status(error.statusCode).json({ "error": err.errorCode, "message": err.message });
        }

    }
    static findById(request: Request, response: Response) {
        let id = request.params.id
        UserService.findById({ id: id })
            .then((result:User) => {
                const {password,...data}=result;
                response.status(200).json(data);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        UserService.findOne(query)
            .then((result:User) => {
                const {password,...data}=result;
                response.status(200).json(data);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findMany(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        UserService.findMany(query)
            .then((result:User[]) => {
                const data=  result.map(({ password, ...rest }) => rest);
                response.status(200).json(data)
            })
            .catch((error: Error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static update(request: Request, response: Response) {
        let id = request.params.id;
        let payload = request.body;
        // const schema = joi.object({
        //     id: joi.number().required(),
        // })
        // const { error, value } = schema.validate({ id: id })
        // if (!error) {
        UserService.update(id, payload)
            .then((result) => {
                if (result) {
                    response.status(200).json(result)
                } else {
                    response.status(400).json("Can't update with this id!")
                }
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
        // } else {
        // let error = Error.badRequestError(error?.details[0]?.message)
        // res.status(error.status).json(error.message);
        // }
    }


    static remove(request: Request, response: Response) {
        let id = request.params.id;
        UserService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default UserController;
