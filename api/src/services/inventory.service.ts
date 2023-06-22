import async from 'async'
import InventoryDal from '../dals/inventory.dal'
import CustomError from '../errors/customError';
import { Inventory } from '../type';

class InventoryService {
    create(payload: Inventory) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    InventoryDal.create(payload).then((result) => done(null, result))
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
            InventoryDal.findMany(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }



    findById(query:any) {
        return new Promise((resolve, reject) => {
            InventoryDal.findById(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            InventoryDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

    update(id:string, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    InventoryDal.findOne({ id })
                        .then((inventory) => {
                            if (inventory) {
                                done(null, inventory)
                            } else {
                                done(new CustomError("Inventory not found", 404, "ERR002"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "ERR001"), null)
                        })
                },
                (inventory:Inventory, done:Function) => {
                    InventoryDal.update(inventory, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Inventory not found", 404, "ERR002"))
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
            InventoryDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Inventory not found  with this id", 404, "ERR002"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "ERR001")))
        })
    }

}


export default new InventoryService;