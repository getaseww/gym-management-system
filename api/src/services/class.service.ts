import async from 'async'
import ClassDal from '../dals/class.dal'
import CustomError from '../errors/customError';
import { Class } from '../type';

class ClassService {
    create(payload: Class) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    ClassDal.create(payload).then((result) => done(null, result))
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
            ClassDal.findMany(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }



    findById(query:any) {
        return new Promise((resolve, reject) => {
            ClassDal.findById(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            ClassDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

    update(id:string, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    ClassDal.findOne({ id })
                        .then((cla) => {
                            if (cla) {
                                done(null, cla)
                            } else {
                                done(new CustomError("Class not found", 404, "ERR002"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "ERR001"), null)
                        })
                },
                (cla:Class, done:Function) => {
                    ClassDal.update(cla, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Class not found", 404, "ERR002"))
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
            ClassDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Class not found  with this id", 404, "ERR002"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

}


export default new ClassService;