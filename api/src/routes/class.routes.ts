import express, { Router } from "express";
import ClassController from "../controllers/class.controller";

let router: Router = express.Router();

router.post("/",  ClassController.create)
.get("/",  ClassController.findAll)

.get("/:id",  ClassController.findById)

.put("/",  ClassController.update)

.delete("/:id",  ClassController.remove)


export default router;