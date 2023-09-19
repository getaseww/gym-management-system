import { MembershipPlan as MembershipPlanType } from '../type';
import {MembershipPlan} from '../models/MembershipPlan';


class MembershipPlanDal {
    create(payload: any) {
        return new Promise((resolve, reject) => {
            MembershipPlan.create(payload)
                .then((result: MembershipPlan) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query: any) => {
        return new Promise((resolve, reject) => {
            MembershipPlan.findAll({
                where: query,
                // orderBy: [
                //     {
                //         createdAt: 'asc'
                //     }
                // ]
            })
                .then((result: MembershipPlan[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            MembershipPlan.findOne({
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

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            MembershipPlan.findOne({
                where: { id },
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
                if (payload.planName) membershipPlan.planName = payload.planName;
                if (payload.price) membershipPlan.price = payload.price;
                if (payload.description) membershipPlan.description = payload.description;
                if (payload.image) membershipPlan.image = payload.image;

                membershipPlan.save()
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
            MembershipPlan.destroy({ where: query })
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

export default new MembershipPlanDal;