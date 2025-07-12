import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";

const userModel = sequelize.define("user", {
  u_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  u_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  u_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  u_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  u_role: {
    type: DataTypes.ENUM,
    values:["user", "admin"],
    defaultValue: "user",
    allowNull: false,
  },
  u_gender: {
    type: DataTypes.ENUM,
    values: ["male", "female"],
    defaultValue: "male",
  },
});

export default userModel;
