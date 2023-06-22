import { prisma } from '../config/db'
import { Inventory } from '../type';


class InventoryDal {
    create(payload: Inventory) {
        return new Promise((resolve, reject) => {
            prisma.inventory.create({ data: payload })
                .then((result: Inventory) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findMany = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.inventory.findMany({
                where: query,
                orderBy: [
                    {
                        createdAt: 'asc'
                    }
                ]
            })
                .then((result: Inventory[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.inventory.findUnique({
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
            prisma.inventory.findUnique({
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
                if (payload.equipmentId) data.equipmentId = payload.equipmentId;
                if (payload.quantity) data.quantity = payload.quantity;

                prisma.inventory.update({
                    where: { id: inventory.id },
                    data,
                })
                    .then((result: Inventory) => {
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
            prisma.inventory.delete({ where: query })
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