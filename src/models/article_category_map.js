"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const { v4: uuidv4 } = require("uuid");

const ArticleCategoryMap = sequelize.define('ArticleCategoryMap', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  article_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  article_category_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  tableName: 'Article_category_map',
  timestamps: true,
  underscored: true,
});

module.exports = {ArticleCategoryMap};