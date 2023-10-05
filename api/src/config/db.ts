import { Sequelize } from 'sequelize';
import env from 'dotenv';

env.config()

import UserFactory, { User } from '../models/User';
import PaymentFactory, { Payment } from '../models/Payment';
import MembershipPlanFactory, { MembershipPlan } from '../models/MembershipPlan';
import FitnessClassFactory, { FitnessClass } from '../models/FitnessClass';
import InventoryFactory, { Inventory } from '../models/Inventory';
import EquipmentCategoryFactory, { EquipmentCategory } from '../models/EquipmentCategory';
import EquipmentFactory, { Equipment } from '../models/Equipment';
import AttendanceFactory, { Attendance } from '../models/Attendance';
import RoleFactory, { Role } from '../models/Role'
export let sequelize: Sequelize;

export default async () => {

  sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    dialectOptions: { decimalNumbers: true },
    logging: false,
  });

  RoleFactory(sequelize);
  UserFactory(sequelize);
  MembershipPlanFactory(sequelize);
  PaymentFactory(sequelize);
  FitnessClassFactory(sequelize);
  AttendanceFactory(sequelize);
  EquipmentCategoryFactory(sequelize);
  EquipmentFactory(sequelize);
  InventoryFactory(sequelize);

  Role.hasMany(User, {
    sourceKey: 'id',
    foreignKey: 'roleId',
  });
  User.hasMany(Payment, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(Attendance, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(FitnessClass, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  User.hasMany(FitnessClass, {
    foreignKey: 'instructorId',
    as: 'instructor',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });


  MembershipPlan.hasMany(MembershipPlan, {
    sourceKey: 'id',
    foreignKey: 'membershipPlanId',
    as: 'membership',
  });

  MembershipPlan.hasMany(Payment, {
    sourceKey: 'id',
    foreignKey: 'membershipPlanId',
    as: 'payment',
  });
  Equipment.hasOne(Inventory, {
    foreignKey: 'equipmentId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  Inventory.belongsTo(Equipment, {
    foreignKey: 'equipmentId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  FitnessClass.hasMany(Attendance, {
    sourceKey: 'id',
    foreignKey: 'fitnessClassId',
    as: 'attendance',
  });
  EquipmentCategory.hasMany(Equipment, {
    sourceKey: 'id',
    foreignKey: 'equipmentCategoryId',
    as: 'equipment',
  });


  sequelize
    .sync({ force: false, alter: false })
    .then((sequelize) => {
      console.log("connected")
    })
    .catch((error: any) => {
      console.log("database error", error)
    });
};

// const sequelize =new Sequelize(process.env.DATABASE,process.env.DATABASE_USER,'',{
//     host:'localhost',
//     dialect:'mysql',
// });



// async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }


// export default sequelize;



// import { PrismaClient } from "@prisma/client";

// // import { env } from "../env/server.mjs";

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     // log:env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
