import {prisma} from '../config/db'
import { Class } from '../type';


class ClassDal {
    create(payload:Class) {
        return new Promise((resolve, reject) => {
            prisma.class.create({ data: payload })
                .then((result:Class) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    findMany = (query:any) => {
        return new Promise((resolve, reject) => {
            prisma.class.findMany({
                where: query,
                orderBy:[
                    {
                        createdAt:'asc'
                    }
                ]
            })
                .then((result:Class[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            prisma.class.findUnique({
                where: query,
            })
                .then((result:Class) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    update = (c:Class, payload:any) => {
        return new Promise((resolve, reject) => {
            if (c) {
                let data:any = {};
                if (payload.className) data.className = payload.className;
                if (payload.description) data.description = payload.description;
                if (payload.startDate) data.startDate = payload.startDate;
                if (payload.endDate) data.endDate = payload.endDate;


                prisma.class.update({
                    where: { id: c.id },
                    data,
                })
                    .then((result:Class) => {
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
            prisma.class.delete({ where: query })
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

module.exports = new ClassDal;