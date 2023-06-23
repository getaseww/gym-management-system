import express, { Router } from "express";
import AttendanceController from "../controllers/attendance.controller";

let router: Router = express.Router();

router.post("/",  AttendanceController.create);

router.get("/",  AttendanceController.findMany);

router.get("/:id",  AttendanceController.findById);

router.put("/",  AttendanceController.update);

router.delete("/:id",  AttendanceController.remove);


export default router;