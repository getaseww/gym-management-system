import async from 'async'
import MembershipPlanDal from '../dals/membershipPlan.dal'
import CustomError from '../errors/customError';
import { MembershipPlan } from '../type';

class MembershipPlanService {
    create(payload: MembershipPlan) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    MembershipPlanDal.create(payload).then((result) => done(null, result))
                        .catch((error) => {
                            console.log(error);
                            done(error, null)
                        })
                }
            ], (error: any, result: any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    findMany(query: any) {
        return new Promise((resolve, reject) => {
            MembershipPlanDal.findMany(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }



    findById(id:string) {
        return new Promise((resolve, reject) => {
            MembershipPlanDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            MembershipPlanDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    update(id:string, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    MembershipPlanDal.findOne({ id })
                        .then((membershipPlan) => {
                            if (membershipPlan) {
                                done(null, membershipPlan)
                            } else {
                                done(new CustomError("Memebership Plan not found", 404, "Not Found"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "Internal Server Error"), null)
                        })
                },
                (membershipPlan:MembershipPlan, done:Function) => {
                    MembershipPlanDal.update(membershipPlan, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Membership Plan not found", 404, "Not Found"))
                            }
                        })
                        .catch((error) => {
                            done(new CustomError(error, 500, "Internal Server Error"))
                        })
                }
            ], (error:any, result:any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    remove(id:string) {
        return new Promise((resolve, reject) => {
            MembershipPlanDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Membership not found  with this id", 404, "Not Found"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

}


export default new MembershipPlanService;