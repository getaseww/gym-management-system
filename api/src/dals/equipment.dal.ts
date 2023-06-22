import { prisma } from '../config/db'
import { Equipment } from '../type';


class EquipmentDal {
    create(payload: Equipment) {
        return new Promise((resolve, reject) => {
            prisma.equipment.create({ data: payload })
                .then((result: Equipment) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findMany = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.equipment.findMany({
                where: query,
                orderBy: [
                    {
                        createdAt: 'asc'
                    }
                ]
            })
                .then((result: Equipment[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.equipment.findUnique({
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

    update = (equipment: Equipment, payload: any) => {
        return new Promise((resolve, reject) => {
            if (equipment) {
                let data: any = {};
                if (payload.equipmentName) data.equipmentName = payload.equipmentName;
                if (payload.brand) data.brand = payload.brand;
                if (payload.price) data.price = payload.price;
                if (payload.status) data.status = payload.status;
                if (payload.model) data.model = payload.model;
                if (payload.purchaseDate) data.purchaseDate = payload.purchaseDate;
                if (payload.warrantyExpiryDate) data.warrantyExpiryDate = payload.warrantyExpiryDate;
                if (payload.description) data.description = payload.description;


                prisma.equipment.update({
                    where: { id: equipment.id },
                    data,
                })
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
            prisma.equipment.delete({ where: query })
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

module.exports = new EquipmentDal;