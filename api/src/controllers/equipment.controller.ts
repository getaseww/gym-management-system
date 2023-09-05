import { Request, Response } from "express";
import EquipmentService from "../services/equipment.service";
import { Equipment, Error } from "../type";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'

class EquipmentController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            equipmentName: z.string(),
            brand: z.string().optional(),
            price: z.number().optional(),
            model: z.string().optional(),
            status: z.string().optional(),
            purchaseDate: z.string().optional(),
            warrantyExpiryDate: z.string().optional(),
            description: z.string().optional(),
            equipmentCategoryId: z.string()
        })

        const data = request.body;
        try {
            schema.parseAsync(data)
            EquipmentService.create(data)
                .then((result: Equipment) => {
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
        EquipmentService.findById(id)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.equipmentName && request.query.equipmentName != "undefined")
            query = { ...query, equipmentName: request.query.equipmentName }
        if (request.query.brand && request.query.brand != "undefined")
            query = { ...query, brand: request.query.brand }
        if (request.query.status && request.query.status != "undefined")
            query = { ...query, status: request.query.status }
        if (request.query.purchaseDate && request.query.purchaseDate != "undefined")
            query = { ...query, purchaseDate: request.query.purchaseDate }

        if (request.query.warrantyExpiryDate && request.query.warrantyExpiryDate != "undefined")
            query = { ...query, warrantyExpiryDate: request.query.warrantyExpiryDate }

        if (request.query.description && request.query.description != "undefined")
            query = { ...query, description: request.query.description }
        if (request.query.model && request.query.model != "undefined")
            query = { ...query, model: request.query.model }
        if (request.query.equipmentCategoryId && request.query.equipmentCategoryId != "undefined")
            query = { ...query, equipmentCategoryId: request.query.equipmentCategoryId }

        EquipmentService.findOne(query)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        if (request.query.equipmentName && request.query.equipmentName != "undefined")
            query = { ...query, equipmentName: request.query.equipmentName }
        if (request.query.brand && request.query.brand != "undefined")
            query = { ...query, brand: request.query.brand }
        if (request.query.status && request.query.status != "undefined")
            query = { ...query, status: request.query.status }
        if (request.query.purchaseDate && request.query.purchaseDate != "undefined")
            query = { ...query, purchaseDate: request.query.purchaseDate }

        if (request.query.warrantyExpiryDate && request.query.warrantyExpiryDate != "undefined")
            query = { ...query, warrantyExpiryDate: request.query.warrantyExpiryDate }

        if (request.query.description && request.query.description != "undefined")
            query = { ...query, description: request.query.description }
        if (request.query.model && request.query.model != "undefined")
            query = { ...query, model: request.query.model }
        if (request.query.equipmentCategoryId && request.query.equipmentCategoryId != "undefined")
            query = { ...query, equipmentCategoryId: request.query.equipmentCategoryId }


        EquipmentService.findAll(query)
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
        EquipmentService.update(id, payload)
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
        EquipmentService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default EquipmentController;
