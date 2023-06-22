import { prisma } from '../config/db'
import { EquipmentCategory } from '../type';


class EquipmentCategoryDal {
    create(payload: EquipmentCategory) {
        return new Promise((resolve, reject) => {
            prisma.equipmentCategory.create({ data: payload })
                .then((result: EquipmentCategory) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findMany = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.equipmentCategory.findMany({
                where: query,
                orderBy: [
                    {
                        createdAt: 'asc'
                    }
                ]
            })
                .then((result: EquipmentCategory[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.equipmentCategory.findUnique({
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
            prisma.equipmentCategory.findUnique({
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
                if (payload.name) data.name = payload.name;

                prisma.equipmentCategory.update({
                    where: { id: equipmentCategory.id },
                    data,
                })
                    .then((result: EquipmentCategory) => {
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
            prisma.equipmentCategory.delete({ where: query })
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