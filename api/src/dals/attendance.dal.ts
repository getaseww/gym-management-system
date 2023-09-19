import { Attendance as AttendanceType } from '../type';
import { Attendance } from '../models/Attendance';

class AttendanceDal {
    create(payload: any) {
        return new Promise((resolve, reject) => {
            Attendance.create(payload)
                .then((result: Attendance) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query: any) => {
        return new Promise((resolve, reject) => {
            Attendance.findAll({
                where: query,
                // orderBy: [
                //     {
                //         createdAt: 'asc'
                //     }
                // ]
            })
                .then((result: Attendance[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            Attendance.findOne({
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
            Attendance.findOne({
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
                if (payload.status) attendance.status = payload.status;
                if (payload.date) attendance.date = payload.date;
                if (payload.checkInTime) attendance.checkInTime = payload.checkInTime;
                if (payload.checkOutTime) attendance.checkOutTime = payload.checkOutTime;


                attendance.save().then((result: Attendance) => {
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
            Attendance.destroy({ where: query })
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