import express, { Router } from "express";
import PaymentController from "../controllers/payment.controller";

let router: Router = express.Router();

router
    .post("/", PaymentController.create)
    .post('/initialize',PaymentController.initPayment)
    .get("/", PaymentController.findMany)
    .get("/:id", PaymentController.findById)
    .put("/", PaymentController.update)
    .delete("/:id", PaymentController.remove)


export default router;