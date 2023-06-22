import async from 'async'
import RoleDal from '../dals/role.dal'
import CustomError from '../errors/customError';
import { Role } from '../type';

class RoleService {
    create(payload: Role) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    RoleDal.create(payload).then((result) => done(null, result))
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
            RoleDal.findMany(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }



    // findById(query:any) {
    //     return new Promise((resolve, reject) => {
    //         RoleDal.findById(query).then((result) => resolve(result))
    //             .catch((error) => reject(new CustomError(error, 500, "ERR001")))
    //     })
    // }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            RoleDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

    update(id:string, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    RoleDal.findOne({ id })
                        .then((role) => {
                            if (role) {
                                done(null, role)
                            } else {
                                done(new CustomError("Role not found", 404, "ERR002"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "ERR001"), null)
                        })
                },
                (role:Role, done:Function) => {
                    RoleDal.update(role, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Role not found", 404, "ERR002"))
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
            RoleDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Role not found  with this id", 404, "ERR002"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

}


export default new RoleService;