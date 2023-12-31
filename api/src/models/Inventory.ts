import { DataTypes, Model, Sequelize } from "sequelize";
import { Equipment } from "./Equipment"; // Import the Equipment model if it's defined in a separate file

export class Inventory extends Model {
  public id!: string;
  public quantity!: number;
  public equipmentId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Inventory.init(
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      equipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "inventory",
      tableName: "inventory",
      timestamps: true,
    }
  );

  // Define associations
  
};
