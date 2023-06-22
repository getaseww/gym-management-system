import { prisma } from '../config/db'
import { Attendance } from '../type';


class AttendanceDal {
    create(payload: Attendance) {
        return new Promise((resolve, reject) => {
            prisma.attendance.create({ data: payload })
                .then((result: Attendance) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findMany = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.attendance.findMany({
                where: query,
                orderBy: [
                    {
                        createdAt: 'asc'
                    }
                ]
            })
                .then((result: Attendance[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            prisma.attendance.findUnique({
                where: query,
            })
                .then((result: Attendance) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }
    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            prisma.attendance.findUnique({
                where: { id },
            })
                .then((result: Attendance) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (attendance: Attendance, payload: any) => {
        return new Promise((resolve, reject) => {
            if (attendance) {
                let data: any = {};
                if (payload.status) data.status = payload.status;
                if (payload.date) data.date = payload.date;
                if (payload.checkInTime) data.checkInTime = payload.checkInTime;
                if (payload.checkOutTime) data.checkOutTime = payload.checkOutTime;


                prisma.attendance.update({
                    where: { id: attendance.id },
                    data,
                })
                    .then((result: Attendance) => {
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
            prisma.attendance.delete({ where: query })
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

export default new AttendanceDal;