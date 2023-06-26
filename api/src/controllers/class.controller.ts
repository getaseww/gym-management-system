import { Request, Response } from "express";
import ClassService from "../services/class.service";
import { Class, Error } from "../type";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'

class ClassController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            className: z.string(),
            description: z.string().optional(),
            startDate: z.date(),
            endDate: z.date(),
            userId: z.string(),
            instructorId: z.string(),
        })

        const data = request.body;
        try {
            schema.parseAsync(data)
            ClassService.create(data)
                .then((result: Class) => {
                    response.status(200).json(result);
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
        ClassService.findById({ id: id })
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.className && request.query.className != "undefined")
            query = { ...query, className: request.query.className }
        if (request.query.startDate && request.query.startDate != "undefined")
            query = { ...query, startDate: request.query.startDate }
        if (request.query.endDate && request.query.endDate != "undefined")
            query = { ...query, endDate: request.query.endDate }
        if (request.query.userId && request.query.userId != "undefined")
            query = { ...query, userId: request.query.userId }

        if (request.query.instructorId && request.query.instructorId != "undefined")
            query = { ...query, instructorId: request.query.instructorId }

        if (request.query.description && request.query.description != "undefined")
            query = { ...query, description: request.query.description }
        
        ClassService.findOne(query)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findMany(request: Request, response: Response) {
        let query = {}
        if (request.query.className && request.query.className != "undefined")
            query = { ...query, className: request.query.className }
        if (request.query.startDate && request.query.startDate != "undefined")
            query = { ...query, startDate: request.query.startDate }
        if (request.query.endDate && request.query.endDate != "undefined")
            query = { ...query, endDate: request.query.endDate }
        if (request.query.userId && request.query.userId != "undefined")
            query = { ...query, userId: request.query.userId }

        if (request.query.instructorId && request.query.instructorId != "undefined")
            query = { ...query, instructorId: request.query.instructorId }

        if (request.query.description && request.query.description != "undefined")
            query = { ...query, description: request.query.description }

        ClassService.findMany(query)
            .then((result) => {
                response.status(200).json(result)
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
        ClassService.update(id, payload)
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
        ClassService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default ClassController;
