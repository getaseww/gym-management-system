import { DataTypes, Model, Sequelize } from "sequelize";
import { MembershipPlan } from "./MembershipPlan"; // Import the MembershipPlan model if it's defined in a separate file
import { User } from "./User"; // Import the User model if it's defined in a separate file

export class Payment extends Model {
  public id!: string;
  public amount!: number;
  public trx_ref!: string;
  public status!: string;
  public membershipPlanId!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Payment.init(
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      trx_ref: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      membershipPlanId: {
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
      modelName: "payment",
      tableName: "payments",
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  // Define associations
  
};
