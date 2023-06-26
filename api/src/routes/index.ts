import { Application } from "express";
import AttendanceRoutes from './attendance.routes'
import UserRoutes from './user.routes'
import RoleRoutes from './role.routes'


const routes=(app:Application)=>{
    app.use("/api/attendance",AttendanceRoutes),
    app.use("/api/user",UserRoutes),
    app.use("/api/role",RoleRoutes)
}

export default routes;