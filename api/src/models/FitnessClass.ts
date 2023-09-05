import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./User"; // Import the User model if it's defined in a separate file
import { Attendance } from "./Attendance"; // Import the Attendance model if it's defined in a separate file

export class FitnessClass extends Model {
  public id!: string;
  public className!: string;
  public description!: string | null;
  public startDate!: Date;
  public endDate!: Date;
  public userId!: number;
  public instructorId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  FitnessClass.init(
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      className: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      instructorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "fitnessClass",
      tableName: "fitness_classes",
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  // Define associations
  FitnessClass.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  FitnessClass.belongsTo(User, {
    foreignKey: 'instructorId',
    as: 'instructor',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  // Define association with Attendance model if needed
  FitnessClass.hasMany(Attendance, {
    sourceKey: 'id',
    foreignKey: 'fitnessClassId',
    as: 'attendance',
  });
};
