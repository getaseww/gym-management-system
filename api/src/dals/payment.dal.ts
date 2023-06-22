import { prisma } from '../config/db'
import { Payment } from '../type';


class PaymentDal {
    create(payload: Payment) {
        return new Promise((resolve, reject) => {
            prisma.payment.create({ data: payload })
                .then((result: Payment) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findMany = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.payment.findMany({
                where: query,
                orderBy: [
                    {
                        createdAt: 'asc'
                    }
                ]
            })
                .then((result: Payment[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.payment.findUnique({
                where: query,
            })
                .then((result: Payment) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (payment: Payment, payload: any) => {
        return new Promise((resolve, reject) => {
            if (payment) {
                let data: any = {};
                if (payload.amount) data.amount = payload.amount;
                if (payload.trx_ref) data.trx_ref = payload.trx_ref;
                if (payload.status) data.status = payload.status;

                prisma.payment.update({
                    where: { id: payment.id },
                    data,
                })
                    .then((result: Payment) => {
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
            prisma.payment.delete({ where: query })
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

module.exports = new PaymentDal;