import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.model.js";


const postModel = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});


postModel.belongsTo(userModel, {
  foreignKey: "userId",   
  targetKey: "u_id",      
  onDelete: "CASCADE",
});

// A User can have many Posts
userModel.hasMany(postModel, {
  foreignKey: "userId",
  sourceKey: "u_id" 
});

export default postModel;