import { Application } from "express";
import AttendanceRoutes from './attendance.routes'

const routes=(app:Application)=>{
    app.use("/api/attendance",AttendanceRoutes)
}

export default routes;