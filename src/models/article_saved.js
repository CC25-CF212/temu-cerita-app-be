"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const { v4: uuidv4 } = require("uuid");

const ArticleSaved = sequelize.define(
  "Article_saved",
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
    modelName: "Article_saved",
    tableName: "Article_saved",
    underscored: true,
    timestamps: true,
  }
);

module.exports = { ArticleSaved }
