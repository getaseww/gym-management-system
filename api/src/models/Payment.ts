import { DataTypes, Model, Sequelize } from "sequelize";
import { MembershipPlan } from "./membershipPlan"; // Import the MembershipPlan model if it's defined in a separate file
import { User } from "./user"; // Import the User model if it's defined in a separate file

export class Payment extends Model {
  public id!: string;
  public amount!: number;
  public trx_ref!: string;
  public status!: string;
  public membershipPlanId!: string;
  public userId!: string;
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
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
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
  Payment.belongsTo(MembershipPlan, {
    foreignKey: 'membershipPlanId',
    as: 'membershipPlan',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Payment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
};
