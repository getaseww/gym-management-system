import express, { Router } from "express";
import EquipmentCategoryController from "../controllers/equipmentCategory.controller";
let router: Router = express.Router();

router.post("/",  EquipmentCategoryController.create)
.get("/",  EquipmentCategoryController.findMany)

.get("/:id",  EquipmentCategoryController.findById)

.put("/",  EquipmentCategoryController.update)

.delete("/:id",  EquipmentCategoryController.remove)


export default router;