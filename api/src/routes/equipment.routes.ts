import express, { Router } from "express";
import EquipmentController from "../controllers/equipment.controller";

let router: Router = express.Router();

router.post("/",  EquipmentController.create)
.get("/",  EquipmentController.findMany)

.get("/:id",  EquipmentController.findById)

.put("/",  EquipmentController.update)

.delete("/:id",  EquipmentController.remove)


export default router;