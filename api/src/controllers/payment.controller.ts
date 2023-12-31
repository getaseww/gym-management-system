import { Request, Response } from "express";
import PaymentService from "../services/payment.service";
import { Payment, Error } from "../type";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'
import { generateTrxRef } from "../utils/helpers";

class PaymentController {
    static initPayment(request: Request, response: Response) {
        const body = request.body;
        const user:any=request.user;
        const data = {
            membershipPlanId:body.membershipPlanId,
            userId:user.id,
            amount: body.amount,
            currency: "ETB",
            email: body.email,
            first_name: body.firstName,
            last_name: body.lastName,
            phone_number: body.phoneNumber,
            tx_ref: generateTrxRef(),
            callback_url: '',
            return_url: '',
        }

        PaymentService.initPayment(data)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })

    }

    static create(request: Request, response: Response) {

        const schema = z.object({
            amount: z.number(),
            membershipPlanId: z.string(),
            userId: z.string(),
            trx_ref: z.string()
        })

        const data = request.body;
        
        try {
            schema.parseAsync(data)
            PaymentService.create(data)
                .then((result: Payment) => {
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
        PaymentService.findById(id)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.amount && request.query.amount != "undefined")
            query = { ...query, amount: request.query.amount }
        if (request.query.status && request.query.status != "undefined")
            query = { ...query, status: request.query.status }

        PaymentService.findOne(query)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        if (request.query.amount && request.query.amount != "undefined")
            query = { ...query, amount: request.query.amount }

        if (request.query.status && request.query.status != "undefined")
            query = { ...query, status: request.query.status }

        PaymentService.findAll(query)
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
        PaymentService.update(id, payload)
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
        PaymentService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default PaymentController;
