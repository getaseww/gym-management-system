import { Role as RoleType, User } from '../type';
import {Role} from '../models/Role';


class RoleDal {
    create(payload:Role) {
        return new Promise((resolve, reject) => {
            Role.create({ data: payload })
                .then((result:Role) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            Role.findAll({
                where: query,
                // orderBy:[
                //     {
                //         name:'asc'
                //     }
                // ]
            })
                .then((result:Role[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            Role.findOne({
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
                if (payload.name) role.name = payload.name;
                role.save()
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
            Role.destroy({ where: query })
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