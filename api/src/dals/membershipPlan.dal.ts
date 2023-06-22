import { prisma } from '../config/db'
import { MembershipPlan } from '../type';


class MembershipPlanDal {
    create(payload: MembershipPlan) {
        return new Promise((resolve, reject) => {
            prisma.membershipPlan.create({ data: payload })
                .then((result: MembershipPlan) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findMany = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.membershipPlan.findMany({
                where: query,
                orderBy: [
                    {
                        createdAt: 'asc'
                    }
                ]
            })
                .then((result: MembershipPlan[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.membershipPlan.findUnique({
                where: query,
            })
                .then((result: MembershipPlan) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (membershipPlan: MembershipPlan, payload: any) => {
        return new Promise((resolve, reject) => {
            if (membershipPlan) {
                let data: any = {};
                if (payload.equipmentId) data.equipmentId = payload.equipmentId;
                if (payload.quantity) data.quantity = payload.quantity;

                prisma.membershipPlan.update({
                    where: { id: membershipPlan.id },
                    data,
                })
                    .then((result: MembershipPlan) => {
                        if (result) {
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    })
                    .catch((error: any) => {
                        reject(error)
                    });
            } else {
                resolve(null);
            }
        });
    }

    remove = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.membershipPlan.delete({ where: query })
                .then((result: any) => {
                    if (result) {
                        resolve("Deleted successfully!")
                    } else {
                        resolve(null)
                    }
                })
                .catch((error: any) => reject(error));
        });
    }
}

module.exports = new MembershipPlanDal;