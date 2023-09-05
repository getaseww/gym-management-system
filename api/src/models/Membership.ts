import { DataTypes, Model, Sequelize } from "sequelize";
import { MembershipPlan } from "./membershipPlan"; // Import the MembershipPlan model if it's defined in a separate file

export class Membership extends Model {
  public id!: string;
  public startDate!: Date;
  public endDate!: Date;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public membershipPlanId!: string;
}

export default (sequelize: Sequelize) => {
  Membership.init(
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      membershipPlanId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "membership",
      tableName: "memberships",
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  // Define associations
  Membership.belongsTo(MembershipPlan, {
    foreignKey: 'membershipPlanId',
    as: 'membershipPlan',
  });
};
