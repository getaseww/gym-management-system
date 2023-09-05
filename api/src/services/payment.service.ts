import async from 'async'
import PaymentDal from '../dals/payment.dal'
import CustomError from '../errors/customError';
import { Payment } from '../models/Payment';
import axios from 'axios';
import { paymentHeader } from '../utils/helpers';

class PaymentService {

    initPayment(payload:any){
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

    create(payload: Payment) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    const data={
                        userId:payload.userId,
                        membershipPlanId:payload.membershipPlanId,
                        trx_ref:payload.trx_ref,
                        amount:payload.amount,
                    }
                    PaymentDal.create(data).then((result) => done(null, result))
                        .catch((error) => {
                            console.log(error);
                            done(error, null)
                        })
                },
                (done:Function)=>{
                    const {membershipPlanId,userId,...data}=payload;
                    axios.post(
                        'https://api.chapa.co/v1/transaction/initialize',
                        data,
                        paymentHeader
                    ).then((result)=>{
                        if(result.data.status === 'success'){
                            done(null,result.data.data.checkout_url)
                        }else{
                            done(result.data.message,null)
                        }
                    }).catch((error)=>{
                        done( new CustomError(error,500,"Internal server problem!"),null)
                    })
                }
            ], (error: any, result: any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    findAll(query: any) {
        return new Promise((resolve, reject) => {
            PaymentDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }



    findById(id:string) {
        return new Promise((resolve, reject) => {
            PaymentDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            PaymentDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
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
                                done(new CustomError("Payment not found", 404, "Not Found"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "Internal Server Error"), null)
                        })
                },
                (payment:Payment, done:Function) => {
                    PaymentDal.update(payment, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Payment not found", 404, "Not Found"))
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
            PaymentDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Payment not found  with this id", 404, "Not Found"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

}


export default new PaymentService;