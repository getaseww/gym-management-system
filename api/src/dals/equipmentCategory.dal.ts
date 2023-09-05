import { EquipmentCategory as EquipmentCategoryType } from '../type';
import {EquipmentCategory} from '../models/EquipmentCategory';


class EquipmentCategoryDal {
    create(payload: EquipmentCategory) {
        return new Promise((resolve, reject) => {
            EquipmentCategory.create({ data: payload })
                .then((result: EquipmentCategory) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query: any) => {
        return new Promise((resolve, reject) => {
            EquipmentCategory.findAll({
                where: query,
                // orderBy: [
                //     {
                //         createdAt: 'asc'
                //     }
                // ]
            })
                .then((result: EquipmentCategory[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            EquipmentCategory.findOne({
                where: query,
            })
                .then((result: EquipmentCategory) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            EquipmentCategory.findOne({
                where: { id },
            })
                .then((result: EquipmentCategory) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (equipmentCategory: EquipmentCategory, payload: any) => {
        return new Promise((resolve, reject) => {
            if (equipmentCategory) {
                let data: any = {};
                if (payload.name) equipmentCategory.name = payload.name;

               
                equipmentCategory.save().then((result: EquipmentCategory) => {
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
            EquipmentCategory.destroy({ where: query })
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

export default new EquipmentCategoryDal;