'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('./index'); 
const { v4: uuidv4 } = require('uuid');

const Article = sequelize.define(
  'Articles',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    thumbnail_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content_html: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    modelName: 'Article',
    tableName: 'Articles',
    underscored: true,
    timestamps: true 
  }
);

module.exports = { Article };
