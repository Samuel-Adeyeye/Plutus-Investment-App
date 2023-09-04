import { DataTypes, Model, Sequelize } from "sequelize";
import { db } from "../config";
import Company from "./company";

type Saving = {
  id: string;
  amount: number;
};

export type INVESTOR = {
  id: string;
  firstName: string;
  lastName: string;
  accountNumber: string;
  email: string;
  investedCapital: number;
  expectedReturn: number;
  monthlyReturn: number;
  returnOnInvestment: number;
  active: boolean;
  companyId: string;
  companyName: string;
};

class Investor extends Model<INVESTOR> {
  public static associate(models: { Company: typeof Company }): void {
    Investor.belongsTo(models.Company, {
      foreignKey: "companyId",
      as: "Company",
    });
  }
}

Investor.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    investedCapital: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    expectedReturn: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    monthlyReturn: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    returnOnInvestment: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.UUID,
      references: {
        model: Company,
        key: "id",
      },
    },
  },
  {
    sequelize: db,
    tableName: "Investor",
    modelName: "Investor",
  }
);

export default Investor;
