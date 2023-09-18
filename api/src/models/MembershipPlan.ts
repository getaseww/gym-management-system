import { DataTypes, Model, Sequelize } from "sequelize";
import { Membership } from "./Membership"; // Import the Membership model if it's defined in a separate file
import { Payment } from "./Payment"; // Import the Payment model if it's defined in a separate file

export class MembershipPlan extends Model {
    public id!: string;
    public planName!: string;
    public description!: string | null;
    public price!: number;
    public image!: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
    MembershipPlan.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            planName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "membershipPlan",
            tableName: "membership_plans",
            timestamps: true,
        }
    );

    // Define associations if needed
    
};
