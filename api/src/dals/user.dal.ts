import {prisma} from '../config/db'
import { User } from '../type';


class UserDal {
    create(payload:User) {
        return new Promise((resolve, reject) => {
            prisma.user.create({ data: payload })
                .then((result:User) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    findMany = (query:any) => {
        return new Promise((resolve, reject) => {
            prisma.user.findMany({
                where: query,
                orderBy:[
                    {
                        createdAt:'asc'
                    }
                ]
            })
                .then((result:User[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            prisma.user.findUnique({
                where: query,
            })
                .then((result:User) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            prisma.user.findUnique({
                where: { id },
            })
                .then((result: User) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (user:User, payload:any) => {
        return new Promise((resolve, reject) => {
            if (user) {
                let data:any = {};
                if (payload.firstName) data.firstName = payload.firstName;
                if (payload.lastName) data.lastName = payload.lastName;
                if (payload.email) data.email = payload.email;
                if (payload.phoneNumber) data.phoneNumber = payload.phoneNumber;


                prisma.user.update({
                    where: { id: user.id },
                    data,
                })
                    .then((result:User) => {
                        if (result) {
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    })
                    .catch((error:any) => {
                        reject(error)
                    });
            } else {
                resolve(null);
            }
        });
    }

    remove = (query:any) => {
        return new Promise((resolve, reject) => {
            prisma.user.delete({ where: query })
                .then((result:any) => {
                    if (result) {
                        resolve("Deleted successfully!")
                    } else {
                        resolve(null)
                    }
                })
                .catch((error:any) => reject(error));
        });
    }
}

export default new UserDal;