import { Request, Response } from "express";
import EquipmentCategoryService from "../services/equipmentCategory.service";
import { EquipmentCategory, Error } from "../type";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'

class EquipmentCategoryController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            name: z.string(),
            description:z.string().optional(),
        })

        const data = request.body;
        try {
            schema.parseAsync(data)
            EquipmentCategoryService.create(data)
                .then((result: EquipmentCategory) => {
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
        EquipmentCategoryService.findById( id )
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.equipmentName }

        if (request.query.description && request.query.description != "undefined")
            query = { ...query, description: request.query.description }
        EquipmentCategoryService.findOne(query)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.equipmentName }
        if (request.query.description && request.query.description != "undefined")
            query = { ...query, description: request.query.description }

        EquipmentCategoryService.findAll(query)
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
        const schema = z.object({
            id: z.string(),
        })
        // const { error, value } = schema.validate({ id: id })
        // if (!error) {
        EquipmentCategoryService.update(id, payload)
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
        EquipmentCategoryService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default EquipmentCategoryController;
