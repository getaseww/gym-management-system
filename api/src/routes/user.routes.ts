import express, { Router } from "express";
import UserController from "../controllers/user.controller";

let router: Router = express.Router();

router.post("/",  UserController.create)
.get("/",  UserController.findMany)

.get("/:id",  UserController.findById)

.put("/",  UserController.update)

.delete("/:id",  UserController.remove)


export default router;