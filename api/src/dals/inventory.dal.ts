import { Inventory as InventoryType} from '../type';
import {Inventory} from '../models/Inventory';


class InventoryDal {
    create(payload: any) {
        return new Promise((resolve, reject) => {
            Inventory.create(payload)
                .then((result: Inventory) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query: any) => {
        return new Promise((resolve, reject) => {
            Inventory.findAll({
                where: query,
                // orderBy: [
                //     {
                //         createdAt: 'asc'
                //     }
                // ]
            })
                .then((result: Inventory[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            Inventory.findOne({
                where: query,
            })
                .then((result: Inventory) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            Inventory.findOne({
                where: { id },
            })
                .then((result: Inventory) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (inventory: Inventory, payload: any) => {
        return new Promise((resolve, reject) => {
            if (inventory) {
                let data: any = {};
                if (payload.equipmentId) inventory.equipmentId = payload.equipmentId;
                if (payload.quantity) inventory.quantity = payload.quantity;

                // Inventory.update({
                //     where: { id: inventory.id },
                //     inventory,
                // })
                inventory.save().then((result: Inventory) => {
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
            Inventory.destroy({ where: query })
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

export default new InventoryDal;