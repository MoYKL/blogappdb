import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../connectionDB.js";
import userModel from "./user.model.js";
import postModel from "./post.model.js";

const commentModel = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});


commentModel.belongsTo(userModel, {
  foreignKey: "userId",
  targetKey: "u_id",     
  onDelete: "CASCADE",
});

userModel.hasMany(commentModel, {
  foreignKey: "userId",
  sourceKey: "u_id"
});

commentModel.belongsTo(postModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

postModel.hasMany(commentModel, {
  foreignKey: "postId"
});


export default commentModel;