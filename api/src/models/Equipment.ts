import { DataTypes, Model, Sequelize } from "sequelize";
import { EquipmentCategory } from "./EquipmentCategory"; // Import the EquipmentCategory model if it's defined in a separate file
import { Inventory } from "./Inventory"; // Import the Inventory model if it's defined in a separate file

export class Equipment extends Model {
    public id!: string;
    public equipmentName!: string;
    public brand!: string | null;
    public price!: number | null;
    public model!: string | null;
    public status!: string | null;
    public purchaseDate!: Date | null;
    public warrantyExpiryDate!: Date | null;
    public description!: string | null;
    public equipmentCategoryId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
    Equipment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            equipmentName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            model: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            purchaseDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            warrantyExpiryDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            equipmentCategoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "equipment",
            tableName: "equipment",
            timestamps: true,
        }
    );

    // Define associations
    // Equipment.belongsTo(EquipmentCategory, {
    //     foreignKey: 'equipmentCategoryId',
    //     as: 'equipmentCategory',
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE',
    // });

    
};
