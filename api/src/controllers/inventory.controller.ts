import { Request, Response } from "express";
import InventoryService from "../services/inventory.service";
import { Inventory, Error } from "../type";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'

class InventoryController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            quantity: z.number(),
            equipmentId: z.string(),
        })

        const data = request.body;
        try {
            schema.parseAsync(data)
            InventoryService.create(data)
                .then((result: Inventory) => {
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
        console.log("inv id",id);
        InventoryService.findById(id)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.quantity && request.query.quantity != "undefined")
            query = { ...query, quantity: request.query.quantity }
        InventoryService.findOne(query)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findMany(request: Request, response: Response) {
        let query = {}
        if (request.query.quantity && request.query.quantity != "undefined")
            query = { ...query, quantity: request.query.quantity }

        InventoryService.findMany(query)
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
        InventoryService.update(id, payload)
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
        InventoryService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default InventoryController;
