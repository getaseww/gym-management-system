import { Application } from "express";
import AttendanceRoutes from './attendance.routes'
import UserRoutes from './user.routes'
import RoleRoutes from './role.routes'
import ClassRoutes from './class.routes'
import PaymentRoutes from './payment.routes'
import InventoryRoutes from './inventory.routes'
import MembershipPlanRoutes from './membershipPlan.routes'
import EquipmentCategoryRoutes from './equipmentCategory.routes';
import EquipmentRoutes from './equipment.routes';


const routes=(app:Application)=>{
    app.use("/api/attendance",AttendanceRoutes),
    app.use("/api/user",UserRoutes),
    app.use("/api/role",RoleRoutes),
    app.use("/api/payment",PaymentRoutes),
    app.use("/api/class",ClassRoutes),
    app.use("/api/inventory",InventoryRoutes),
    app.use("/api/membership-plan",MembershipPlanRoutes),
    app.use('/api/equipment-category',EquipmentCategoryRoutes),
    app.use('/api/equipment',EquipmentRoutes)

}

export default routes;