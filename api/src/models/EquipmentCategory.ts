import { DataTypes, Model, Sequelize } from "sequelize";
import { Equipment } from "./Equipment"; // Import the Equipment model if it's defined in a separate file

export class EquipmentCategory extends Model {
  public id!: string;
  public name!: string;
  public description!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  EquipmentCategory.init(
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "equipmentCategory",
      tableName: "equipment_categories",
      timestamps: true,
    }
  );

  // Define associations
  EquipmentCategory.hasMany(Equipment, {
    sourceKey: 'id',
    foreignKey: 'equipmentCategoryId',
    as: 'equipment',
  });
};
