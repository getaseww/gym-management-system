import { DataTypes, Model, Sequelize } from "sequelize";
import { FitnessClass } from "./FitnessClass"; // Import the Class model if it's defined in a separate file
import { User } from "./User"; // Import the User model if it's defined in a separate file

export class Attendance extends Model {
  public id!: string;
  public date!: Date;
  public status!: string;
  public checkInTime!: string | null;
  public checkOutTime!: string | null;
  public classId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Attendance.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      checkInTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      checkOutTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "attendance",
      tableName: "attendances",
      timestamps: true,
    }
  );

  // Define associations
  Attendance.belongsTo(FitnessClass, {
    foreignKey: 'classId',
    as: 'class',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Attendance.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};
