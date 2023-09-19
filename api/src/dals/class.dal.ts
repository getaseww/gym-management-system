import { Class } from '../type';
import { FitnessClass } from '../models/FitnessClass';

class ClassDal {
    create(payload:any) {
        return new Promise((resolve, reject) => {
            FitnessClass.create(payload)
                .then((result) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            FitnessClass.findAll({
                where: query,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            FitnessClass.findOne({
                where: query,
            })
                .then((result) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }
    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            FitnessClass.findOne({
                where: { id },
            })
                .then((result) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }
    update = (c:FitnessClass, payload:any) => {
        return new Promise((resolve, reject) => {
            if (c) {
                if (payload.className) c.className = payload.className;
                if (payload.description) c.description = payload.description;
                if (payload.startDate) c.startDate = payload.startDate;
                if (payload.endDate) c.endDate = payload.endDate;


                c.save()
                    .then((result) => {
                        if (result) {
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    })
                    .catch((error:any) => {
                        reject(error)
                    });
            } else {
                resolve(null);
            }
        });
    }

    remove = (query:any) => {
        return new Promise((resolve, reject) => {
            FitnessClass.destroy({ where: query })
                .then((result:any) => {
                    if (result) {
                        resolve("Deleted successfully!")
                    } else {
                        resolve(null)
                    }
                })
                .catch((error:any) => reject(error));
        });
    }
}

export default new ClassDal;