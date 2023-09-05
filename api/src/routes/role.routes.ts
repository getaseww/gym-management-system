import express, { Router } from "express";
import RoleController from "../controllers/role.controller";

let router: Router = express.Router();

router.post("/", RoleController.create)

    .get("/", RoleController.findAll)

    .put("/", RoleController.update)

    .delete("/:id", RoleController.remove)


export default router;