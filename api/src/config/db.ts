import {Sequelize} from 'sequelize';
import env from  'dotenv';

env.config()

const sequelize =new Sequelize(process.env.DATABASE,process.env.DATABASE_USER,'',{
    host:'localhost',
    dialect:'mysql',
});



async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


export default sequelize;



// import { PrismaClient } from "@prisma/client";

// // import { env } from "../env/server.mjs";

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     // log:env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
