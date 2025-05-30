"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const { v4: uuidv4 } = require("uuid");

const ArticleLikes = sequelize.define(
  "Article_likes",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    article_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    modelName: "Article_likes",
    tableName: "Article_likes",
    underscored: true,
    timestamps: true,
  }
);

module.exports = { ArticleLikes }
