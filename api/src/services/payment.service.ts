import async from 'async'
import PaymentDal from '../dals/payment.dal'
import CustomError from '../errors/customError';
import { Payment } from '../type';

class PaymentService {
    create(payload: Payment) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    PaymentDal.create(payload).then((result) => done(null, result))
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
            PaymentDal.findMany(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }



    findById(query:any) {
        return new Promise((resolve, reject) => {
            PaymentDal.findById(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            PaymentDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

    update(id:string, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    PaymentDal.findOne({ id })
                        .then((payment) => {
                            if (payment) {
                                done(null, payment)
                            } else {
                                done(new CustomError("Payment not found", 404, "ERR002"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "ERR001"), null)
                        })
                },
                (payment:Payment, done:Function) => {
                    PaymentDal.update(payment, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Payment not found", 404, "ERR002"))
                            }
                        })
                        .catch((error) => {
                            done(new CustomError(error, 500, "ERR001"))
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
            PaymentDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Payment not found  with this id", 404, "ERR002"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

}


export default new PaymentService;