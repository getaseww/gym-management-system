import express, { Router } from "express";
import InventoryController from "../controllers/inventory.controller";

let router: Router = express.Router();

router.post("/",  InventoryController.create)
.get("/",  InventoryController.findMany)

.get("/:id",  InventoryController.findById)

.put("/",  InventoryController.update)

.delete("/:id",  InventoryController.remove)


export default router;