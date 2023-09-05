import async from 'async'
import EquipmentCategoryDal from '../dals/equipmentCategory.dal'
import CustomError from '../errors/customError';
import { EquipmentCategory } from '../models/EquipmentCategory';

class EquipmentCategoryService {
    create(payload: EquipmentCategory) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    EquipmentCategoryDal.create(payload).then((result) => done(null, result))
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

    findAll(query: any) {
        return new Promise((resolve, reject) => {
            EquipmentCategoryDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }



    findById(id:string) {
        return new Promise((resolve, reject) => {
            EquipmentCategoryDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            EquipmentCategoryDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    update(id:string, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    EquipmentCategoryDal.findOne({ id })
                        .then((equipmentCat) => {
                            if (equipmentCat) {
                                done(null, equipmentCat)
                            } else {
                                done(new CustomError("Equipment Category not found", 404, "Not Found"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "Internal Server Error"), null)
                        })
                },
                (equipmentCat:EquipmentCategory, done:Function) => {
                    EquipmentCategoryDal.update(equipmentCat, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Equipment Category not found", 404, "Not Found"))
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
            EquipmentCategoryDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Equipment Category not found  with this id", 404, "Not Found"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

}


export default new EquipmentCategoryService;