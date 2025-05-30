"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const { v4: uuidv4 } = require("uuid");

const ArticleComments = sequelize.define(
  "Article_comments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_comment_id: {
      type: DataTypes.UUID,
      allowNull: true,
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
    modelName: "Article_comments",
    tableName: "Article_comments",
    underscored: true,
    timestamps: true,
  }
);

module.exports = { ArticleComments }