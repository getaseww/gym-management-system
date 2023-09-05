import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
    public id!: number;
    public firstName!: string;    
    public lastName!: string;
    public email!: string;
    public phoneNumber!: string;
    public password!: string;
    public sex!: string;
    public roleId!: number;
    public isAdmin!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  export default (sequelize: Sequelize) => {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sex: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue:false,
        },
      },
      {
        sequelize,
        modelName: "user",
        tableName: "users",
      }
    );
  };