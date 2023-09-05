import { Request, Response } from "express";
import RoleService from "../services/role.service";
import { Role, Error } from "../type";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'
import express from "express";

class RoleController {

    static create(request: Request, response: Response) {
        const schema = z.object({
            name: z.string(),
        })


        const data = request.body;
        try {
            schema.parseAsync(data)
            RoleService.create(data)
                .then((result: Role) => {
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

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        RoleService.findOne(query)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        RoleService.findAll(query)
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
        RoleService.update(id, payload)
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
        RoleService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default RoleController;
