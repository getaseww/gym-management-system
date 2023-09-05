import { Equipment as EquipmentType } from '../type';
import { Equipment } from '../models/Equipment';

class EquipmentDal {
    create(payload: Equipment) {
        return new Promise((resolve, reject) => {
            Equipment.create({ data: payload })
                .then((result: Equipment) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query: any) => {
        return new Promise((resolve, reject) => {
            Equipment.findAll({
                where: query,
                // orderBy: [
                //     {
                //         createdAt: 'asc'
                //     }
                // ]
            })
                .then((result: Equipment[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            Equipment.findOne({
                where: query,
            })
                .then((result: Equipment) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            Equipment.findOne({
                where: { id },
            })
                .then((result: Equipment) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (equipment: Equipment, payload: any) => {
        return new Promise((resolve, reject) => {
            if (equipment) {
                if (payload.equipmentName) equipment.equipmentName = payload.equipmentName;
                if (payload.brand) equipment.brand = payload.brand;
                if (payload.price) equipment.price = payload.price;
                if (payload.status) equipment.status = payload.status;
                if (payload.model) equipment.model = payload.model;
                if (payload.purchaseDate) equipment.purchaseDate = payload.purchaseDate;
                if (payload.warrantyExpiryDate) equipment.warrantyExpiryDate = payload.warrantyExpiryDate;
                if (payload.description) equipment.description = payload.description;


                equipment.save()
                    .then((result: Equipment) => {
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
            Equipment.destroy({ where: query })
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

export default new EquipmentDal;