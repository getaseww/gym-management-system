import async from 'async'
import EquipmentDal from '../dals/equipment.dal'
import CustomError from '../errors/customError';
import { Equipment } from '../type';

class EquipmentService {
    create(payload: Equipment) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    EquipmentDal.create(payload).then((result) => done(null, result))
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
            EquipmentDal.findMany(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }



    findById(query:any) {
        return new Promise((resolve, reject) => {
            EquipmentDal.findById(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            EquipmentDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

    update(id:string, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    EquipmentDal.findOne({ id })
                        .then((equipment) => {
                            if (equipment) {
                                done(null, equipment)
                            } else {
                                done(new CustomError("Equipment not found", 404, "ERR002"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "ERR001"), null)
                        })
                },
                (equipment:Equipment, done:Function) => {
                    EquipmentDal.update(equipment, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Equipment not found", 404, "ERR002"))
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
            EquipmentDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Equipment not found  with this id", 404, "ERR002"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

}


export default new EquipmentService;