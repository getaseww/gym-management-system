import {prisma} from '../config/db'
import { Role, User } from '../type';


class RoleDal {
    create(payload:Role) {
        return new Promise((resolve, reject) => {
            prisma.role.create({ data: payload })
                .then((result:Role) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    findMany = (query:any) => {
        return new Promise((resolve, reject) => {
            prisma.role.findMany({
                where: query,
                orderBy:[
                    {
                        name:'asc'
                    }
                ]
            })
                .then((result:Role[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            prisma.role.findUnique({
                where: query,
            })
                .then((result:Role) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    update = (role:Role, payload:any) => {
        return new Promise((resolve, reject) => {
            if (role) {
                let data:any = {};
                if (payload.name) data.name = payload.name;


                prisma.role.update({
                    where: { id: role.id },
                    data,
                })
                    .then((result:Role) => {
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
            prisma.role.delete({ where: query })
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

export default new RoleDal;