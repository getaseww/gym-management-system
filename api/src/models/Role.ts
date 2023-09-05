import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./User"; // Import the User model if it's defined in a separate file

export class Role extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "role",
      tableName: "roles",
      timestamps: true,
    }
  );

  // Define associations if needed
  Role.hasMany(User, {
    sourceKey: 'id',
    foreignKey: 'roleId',
    as: 'user',
  });
};
