import { Request, Response } from "express";
import AttendanceService from "../services/attendance.service";
import { Attendance, Error } from "../type";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'

class AttendanceController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            date: z.date(),
            status: z.string(),
            checkInTime: z.string().optional(),
            checkOutTime: z.string().optional(),
            classId: z.string(),
            userId: z.string(),
        })

        const data = request.body;
        try {
            schema.parseAsync(data)
            AttendanceService.create(data)
                .then((result: Attendance) => {
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
        AttendanceService.findById({ id: id })
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.date && request.query.date != "undefined")
            query = { ...query, date: request.query.date }
        if (request.query.status && request.query.status != "undefined")
            query = { ...query, status: request.query.status }
        if (request.query.classId && request.query.classId != "undefined")
            query = { ...query, classId: request.query.classId }
        if (request.query.userId && request.query.userId != "undefined")
            query = { ...query, userId: request.query.userId }

        AttendanceService.findOne(query)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findMany(request: Request, response: Response) {
        let query = {}
        if (request.query.date && request.query.date != "undefined")
            query = { ...query, date: request.query.date }
        if (request.query.status && request.query.status != "undefined")
            query = { ...query, status: request.query.status }
        if (request.query.classId && request.query.classId != "undefined")
            query = { ...query, classId: request.query.classId }
        if (request.query.userId && request.query.userId != "undefined")
            query = { ...query, userId: request.query.userId }

        AttendanceService.findMany(query)
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
        AttendanceService.update(id, payload)
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
        AttendanceService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default AttendanceController;
